<script setup lang="ts">
import { ICategoryResponse, IProduct } from "~/@types";

const { $backendUrl } = useNuxtApp();
const notificationStore = useNotificationStore();
const { data } = useFetch<ICategoryResponse>(`${$backendUrl()}/api/category`, {
	method: "GET",
	key: "category",
});

const props = defineProps<{
	product: IProduct;
}>();
const emit = defineEmits<{
	(e: "edited"): void;
	(e: "closed"): void;
}>();
const newName = ref<string>(props.product.name);
const nameError = ref<string>();
function validateName() {
	if (newName.value.length === 0) {
		nameError.value = "Название должно быть указано";
	} else {
		nameError.value = undefined;
	}
}

const newDescription = ref<string>(props.product.description);

const newPrice = ref<string>(String(props.product.price));
const priceError = ref<string>();

const newNotes = ref<string>(props.product.notes);

const newCategoryId = ref<string>(props.product.categoryId);
const newCategoryName = ref<string>(
	data.value?.categories.find((c) => c.id === props.product.categoryId)?.name ||
		"- Выберете категорию -"
);
function onSelected(id: string) {
	if (data.value && data.value.categories) {
		newCategoryName.value = data.value.categories.find(
			(c) => c.id === id
		)!.name;
		newCategoryId.value = id;
	}
}

const newImage = ref<File>();
const imageError = ref<string>();
function onImageChange(e: Event) {
	const { files } = e.target as HTMLInputElement;
	if (!files || !files[0]) {
		imageError.value = "Изображение необходимо выбрать";
		return;
	}
	const selectedImage = files[0];
	if (!selectedImage) {
		imageError.value = "Изображение необходимо выбрать";
		return;
	}
	const acceptedTypes = [
		"image/apng",
		"image/avif",
		"image/gif",
		"image/jpeg",
		"image/png",
		"image/webp",
	];
	if (acceptedTypes.includes(selectedImage.type)) {
		if (selectedImage.size >= 512 * 1024 * 1024) {
			imageError.value = "Изображение слишком большого размера";
			return;
		} else {
			newImage.value = selectedImage;
			imageError.value = undefined;
		}
	} else {
		imageError.value = "Формат изображения не поддерживается";
		return;
	}
}

const sendButtonDisabled = computed(() => {
	return Boolean(nameError.value || priceError.value || imageError.value);
});

const onSend = async () => {
	const body = new FormData();
	body.set("name", newName.value);
	body.set("description", newDescription.value);
	body.set("notes", newNotes.value);
	body.set("categoryId", newCategoryId.value);
	body.set("price", newPrice.value);
	if (newImage.value) {
		body.set("image", newImage.value);
	}
	const req = await $fetch<IProduct>(
		`${$backendUrl()}/api/product/${props.product.id}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${useCookie("token").value}`,
			},
			body,
		}
	).catch((e) => {
		notificationStore.addErrorNotification("Ошибка изменения товара", e);
	});
	if (req) {
		notificationStore.addInfoNotification(
			"Товар успешно изменён",
			`Успешное изменение товара ${props.product.name}`
		);
		emit("edited");
	}
};
</script>

<template>
	<TheModal
		:header="`Изменение товара ${product.name}`"
		@close="emit('closed')"
	>
		<div class="edit-product-form">
			<form class="edit-product-form__inputs">
				<UITextInput
					label="Название товара"
					:placeholder="product.name"
					v-model="newName"
					@input="validateName"
					@focus="validateName"
				/>
				<UITextInput label="Описание товара" v-model="newDescription" />
				<UINumberInput
					label="Цена за единицу"
					v-model="newPrice"
					placeholder="1234.56"
				/>
				<UITextInput
					label="Примечания"
					placeholder="Раки до 30 гр; В килограмме примерно 20 штук"
					v-model="newNotes"
				/>
				<ValidateableInput label="Изображение" v-slot="s" lg>
					<input :id="s.id" type="file" @input="onImageChange" />
				</ValidateableInput>
				<UITheSelect
					label="Категория"
					:list="data?.categories"
					:selected="newCategoryName"
					@selected="onSelected"
				/>
			</form>
			<UIErrorList :errors-list="[nameError, priceError, imageError]" />
			<button
				class="edit-product-form__btn"
				:disabled="sendButtonDisabled"
				@click.prevent="onSend"
			>
				Изменить товар
			</button>
		</div>
	</TheModal>
</template>

<style lang="scss">
@use "sass:color";
.edit-product-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 14px;
	padding: 1rem;
	&__inputs {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	&__errors {
		display: flex;
		flex-direction: column;
		width: 450px;
	}
	&__error {
		display: block;
		color: #d40000;
		font-family: "Raleway";
		font-size: 13px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0.26px;
	}
	&__btn {
		width: 450px;
		height: 48px;
		border-radius: 8px;
		background-color: #591c21;
		color: #fbfbfb;
		border: none;
		outline: none;
		transition: all ease 0.2s;
		&:disabled {
			background-color: #7b6063;
			color: #fbfbfb80;
			cursor: not-allowed;
		}
		&:not(:disabled) {
			&:hover {
				background-color: color.adjust($color: #591c21, $lightness: 5%);
			}
			&:focus {
				outline: solid 1px #591c21;
				outline-offset: 1px;
			}
		}
	}
}
</style>
