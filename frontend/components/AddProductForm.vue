<script setup lang="ts">
import { ICategoryResponse, ICreateProductResponse } from "~/@types";

const emit = defineEmits<{
	(e: "canceled"): void;
	(e: "product-created"): void;
}>();

const props = defineProps<{
	categoryId?: string;
}>();

const { $backendUrl } = useNuxtApp();

const notificationStore = useNotificationStore();

const { data } = await useFetch<ICategoryResponse>(
	`${$backendUrl()}/api/category`,
	{ key: "categories" }
);

const name = ref<string>("");
const nameError = ref<string>("");
function validateName() {
	if (name.value.length === 0) {
		nameError.value = "Название товара необходимо указать";
	} else {
		nameError.value = "";
	}
}

const description = ref<string>("");

const price = ref<string>("");
const priceError = ref<string>("");
const onPriceChange = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (!Number(value)) {
		return;
	} else {
		price.value = value;
	}
};

const notes = ref<string>("");

const image = ref<File>();
const imageError = ref<string>("");
const acceptedTypes = [
	"image/apng",
	"image/avif",
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/webp",
];
const onImageChange = (e: Event) => {
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
	if (acceptedTypes.includes(selectedImage.type)) {
		if (selectedImage.size >= 512 * 1024 * 1024) {
			imageError.value = "Изображение слишком большого размера";
			return;
		} else {
			image.value = selectedImage;
			imageError.value = "";
		}
	} else {
		imageError.value = "Формат изображения не поддерживается";
		return;
	}
};
const category = ref<string>(
	data.value?.categories.find((c) => c.id === props.categoryId)?.name ||
		"- Выберите категорию -"
);
function onSelected(id: string) {
	if (data.value && data.value.categories) {
		category.value = data.value.categories.find((c) => c.id === id)!.name;
		categoryId.value = id;
	}
}
const categoryId = ref<string>(props.categoryId || "");

const sendButtonDisabled = computed(() => {
	return Boolean(
		nameError.value ||
			!name.value ||
			priceError.value ||
			!price.value ||
			imageError.value ||
			!image.value ||
			!category.value
	);
});

const onCreateProduct = async () => {
	const body = new FormData();
	if (!image.value) return;
	body.set("name", name.value);
	body.set("description", description.value);
	body.set("price", price.value);
	body.set("categoryId", categoryId.value);
	body.set("image", image.value);
	const res = await $fetch<ICreateProductResponse>(
		`${$backendUrl()}/api/product`,
		{
			method: "post",
			headers: {
				Authorization: `Bearer ${useCookie("token").value}`,
			},
			body,
		}
	).catch((e) =>
		notificationStore.addErrorNotification("Ошибка добавления товара", e)
	);
	if (res) {
		notificationStore.addInfoNotification(
			"Успешное добавление",
			`Товар ${name.value} успешно создан`
		);
		emit("product-created");
	}
};
</script>

<template>
	<TheModal header="Добавление товара" @close="emit('canceled')">
		<div class="add-product-form">
			<div class="add-product-form__inputs">
				<ValidateableInput label="Название товара" lg v-slot="s">
					<input
						:id="s.id"
						type="text"
						placeholder="Раки"
						class="labeled-input__input lg"
						v-model="name"
						@input="validateName"
						@focus="validateName"
					/>
				</ValidateableInput>
				<ValidateableInput label="Описание товара" lg v-slot="s">
					<textarea
						:id="s.id"
						v-model="description"
						placeholder="Отличная закуска"
						class="labeled-input__input lg"
						>{{ description }}</textarea
					>
				</ValidateableInput>
				<ValidateableInput label="Цена за единицу" lg v-slot="s">
					<input
						:id="s.id"
						type="text"
						placeholder="1200,20"
						class="labeled-input__input lg"
						:value="price"
						v-maska
						data-maska="0.99"
						data-maska-tokens="0:\d:multiple|9:\d:optional"
						@input="onPriceChange"
					/>
				</ValidateableInput>
				<ValidateableInput label="Примечания" lg v-slot="s">
					<input
						:id="s.id"
						type="text"
						class="labeled-input__input lg"
						placeholder="Раки до 30 гр; В килограмме примерно 20 штук"
						v-model="notes"
					/>
				</ValidateableInput>
				<ValidateableInput label="Изображение" lg v-slot="s">
					<input type="file" :id="s.id" @input="onImageChange" />
				</ValidateableInput>
				<ValidateableInput label="Категория" lg v-slot="s">
					<UITheSelect
						:list="data?.categories"
						:selected="category"
						@selected="onSelected"
						:id="s.id"
					/>
				</ValidateableInput>
			</div>
			<div class="add-product-form__errors">
				<span v-if="sendButtonDisabled" class="add-product-form__error">
					Есть незаполненные поля</span
				>
				<span v-if="priceError" class="add-product-form__error">
					{{ priceError }}</span
				>
				<span v-if="imageError" class="add-product-form__error">
					{{ imageError }}</span
				>
			</div>
			<button
				class="add-product-form__btn"
				:disabled="sendButtonDisabled"
				@click.prevent="onCreateProduct"
			>
				Добавить товар
			</button>
		</div>
	</TheModal>
</template>

<style lang="scss">
@use "sass:color";
.add-product-form {
	align-items: center;
	align-items: flex-start;
	display: flex;
	display: inline-flex;
	flex-direction: column;
	gap: 14px;
	padding: 19px 10px 19px 18px;
	&__inputs {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 9px;
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
