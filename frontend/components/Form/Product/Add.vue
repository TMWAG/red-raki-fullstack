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
	body.set("notes", notes.value);
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
		<UIFormWrapper>
			<UITextInput
				label="Название товара"
				placeholder="Раки варёные"
				v-model="name"
				@input="validateName"
				@focus="validateName"
			/>
			<UITextInput
				label="Описание товара"
				placeholder="Отличная закуска"
				v-model="description"
			/>
			<UINumberInput
				label="Цена за единицу товара"
				placeholder="1234.56"
				v-model="price"
			/>
			<UITextInput
				label="Примечания"
				placeholder="Раки до 30 гр; В килограмме примерно 20 штук"
				v-model="notes"
			/>
			<ValidateableInput label="Изображение" lg v-slot="s">
				<input type="file" :id="s.id" @input="onImageChange" />
			</ValidateableInput>
			<UITheSelect
				label="Категория"
				:list="data?.categories"
				:selected="category"
				@selected="onSelected"
			/>
			<UIErrorList :errors-list="[nameError, imageError]" />
			<UITheButton
				:disabled="sendButtonDisabled"
				@click.prevent="onCreateProduct"
			>
				Добавить товар
			</UITheButton>
		</UIFormWrapper>
	</TheModal>
</template>
