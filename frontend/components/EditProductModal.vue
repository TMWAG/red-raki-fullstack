<script setup lang="ts">
import { ICategoryResponse, IProduct } from "~/@types";

const { $backendUrl } = useNuxtApp();
const notificationStore = useNotificationStore();
const { data } = useFetch<ICategoryResponse>(
	`${$backendUrl()}/api/category`
);

const props = defineProps<{
	product: IProduct;
}>();
const emit = defineEmits<{
	(e: "edited"): void;
	(e: "closed"): void;
}>();
const newName = ref<string>(props.product.name);
const nameError = ref<string>("");
const onNameChange = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (value.length === 0) {
		nameError.value = "Название должно быть указано";
	} else {
		nameError.value = "";
	}
	newName.value = value;
};

const newDescription = ref<string>(props.product.description);

const newPrice = ref<string>(String(props.product.price));
const priceError = ref<string>("");
const onPriceChange = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (!Number(value)) {
		priceError.value = "Цена должна быть числом";
	} else {
		priceError.value = "";
	}
	newPrice.value = value;
};

const newCategory = ref<string>(props.product.categoryId);
const onCategoryChange = (e: Event) => {
	newCategory.value = (e.target as HTMLSelectElement).value;
};

const newImage = ref<File>();
const imageError = ref<string>();
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
			imageError.value = "";
		}
	} else {
		imageError.value = "Формат изображения не поддерживается";
		return;
	}
};

const sendButtonDisabled = computed(() => {
	return Boolean(nameError.value || priceError.value || imageError.value);
});

const onSend = async () => {
	const body = new FormData();
	body.set("name", newName.value);
	body.set("description", newDescription.value);
	body.set("categoryId", newCategory.value);
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
		<div class="form_wrapper">
      <ValidateableInput
        label="Название"
        :value="newName"
        :error="nameError"
        @input="onNameChange"
        type="text"
      />
      <label class="input">
        Описание товара
        <textarea v-model="newDescription" placeholder="Идеальная закуска">{{
          newDescription
        }}</textarea>
      </label>
      <ValidateableInput
        :value="newPrice"
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
        <select v-model="newCategory" @change="onCategoryChange">
          <option
            v-for="c in data?.categories"
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
        @click.prevent="onSend"
      >Изменить товар</button>
    </div>
	</TheModal>
</template>

<style lang="scss" scoped>
@use '/assets/colors';
@use 'sass:color';
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
