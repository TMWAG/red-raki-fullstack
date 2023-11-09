<script setup lang="ts">
import { ICategoryResponse, ICreateProductResponse } from "~/@types";

const { $backendUrl } = useNuxtApp();

const notificationStore = useNotificationStore();

const categoriesResponse = await $fetch<ICategoryResponse>(
	`${$backendUrl()}/api/category`
).catch((e) =>
	notificationStore.addErrorNotification("Ошибка получения категорий", e)
);

const categoriesList = categoriesResponse!.categories;

const emit = defineEmits<{
	(e: "canceled"): void;
	(e: "product-created"): void;
}>();

const name = ref<string>("");
const nameError = ref<string>("");
const onNameChange = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (value.length === 0) {
		nameError.value = "Название необходимо указать";
	} else {
		nameError.value = "";
	}
	name.value = value;
};
const description = ref<string>("");

const price = ref<string>("");
const priceError = ref<string>("");
const onPriceChange = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (!Number(value)) {
		priceError.value = "Цена должна быть целым числом";
	} else {
		priceError.value = "";
	}
	price.value = value;
};

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
const category = ref<string>("");
const onCategoryChange = (e: Event) => {
	category.value = (e.target as HTMLSelectElement).value;
};

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
	body.set("categoryId", category.value);
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
			`Товар ${res.name} успешно создан`
		);
		emit('product-created');
	}
};
</script>

<template>
	<TheModal header="Добавление товара" @close="emit('canceled')">
		<div class="form_wrapper">
			<ValidateableInput
				:value="name"
				:error="nameError"
				label="Название товара"
				placeholder="Раки отборные"
				type="text"
				@input="onNameChange"
			/>
			<label class="input">
				Описание товара
				<textarea v-model="description" placeholder="Идеальная закуска">{{
					description
				}}</textarea>
			</label>
			<ValidateableInput
				:value="price"
				type="number"
				label="Цена за единицу"
				placeholder="1200"
				:error="priceError"
				@input="onPriceChange"
			/>
			<label class="input">
				Изображение
				<input type="file" @input="onImageChange" />
				<span class="error">{{ imageError }}</span>
			</label>
			<label class="input">
				Категория
				<select v-model="category" @change="onCategoryChange">
					<option
						v-for="c in categoriesList"
						:value="c.id"
						:key="`select-${c.name}`"
					>
						{{ c.name }}
					</option>
				</select>
			</label>
			<button
				class="button"
				:disabled="sendButtonDisabled"
				@click.prevent="onCreateProduct"
			>
				Добавить товар
			</button>
		</div>
	</TheModal>
</template>

<style lang="scss" scoped>
@use "/assets/colors";
@use "sass:color";
.form_wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
}
.input {
	font-size: 1rem;
	width: min-content;
	display: flex;
	flex-direction: column;
	align-items: baseline;
	justify-content: flex-start;
	min-height: 7rem;
	& input,
	textarea,
	select {
		resize: vertical;
		font-size: 1.25rem;
		min-height: 3rem;
		height: fit-content;
		width: 20rem;
		padding: 0.25rem;
		margin: 0.25rem;
		border-radius: 3px;
		border: 2px solid colors.$accent;
		transition: border-color, scale ease-in-out 0.3s;
		&:focus {
			border-color: colors.$primary;
			outline: none;
			transition: border-color, scale ease-in-out 0.3s;
			scale: 105%;
		}
		&::placeholder {
			font-size: 1.25rem;
			color: colors.$accent;
			opacity: 0.75;
		}
		&:invalid {
			background-color: color.adjust($color: colors.$warn, $alpha: -0.8);
		}
	}
	.error {
		color: colors.$warn;
		text-align: center;
		font-size: 0.9rem;
	}
}
.button {
	font-size: 1rem;
	height: 2rem;
	width: fit-content;
	padding: 0 0.25rem;
	border: 2px solid colors.$accent;
	border-radius: 3px;
	background-color: white;
	transition: border-color, scale ease-in-out 0.3s;
	&:hover {
		scale: 105%;
		border-color: colors.$primary;
		transition: border-color, scale ease-in-out 0.3s;
	}
}
</style>
