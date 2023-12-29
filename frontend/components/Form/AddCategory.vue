<script setup lang="ts">
import { ICategory } from "~/@types";

const emit = defineEmits<{
	(e: "category-created"): void;
	(e: "canceled"): void;
}>();

const { $backendUrl } = useNuxtApp();
const notificationStore = useNotificationStore();

const name = ref<string>("");
const nameError = ref<string>("");
function validateName() {
	if (name.value.length === 0) {
		nameError.value = "Название необходимо указать";
	} else {
		nameError.value = "";
	}
}

async function addCategory() {
	await $fetch<ICategory>(`${$backendUrl()}/api/category`, {
		method: "POST",
		body: JSON.stringify({
			name: name.value,
		}),
		headers: {
			Authorization: `Bearer ${useCookie("token").value}`,
		},
	}).catch((e) =>
		notificationStore.addErrorNotification("Ошибка добавления", e)
	);
	emit("category-created");
}

function onModalClose() {
	name.value = "";
	nameError.value = "";
	emit("canceled");
}
</script>

<template>
	<TheModal header="Добавление категории" @close="onModalClose">
		<form class="add-category-modal">
			<UITextInput
				label="Название новой категории"
				placeholder="Раки"
				v-model="name"
				@input="validateName"
				@focus="validateName"
			/>
			<UIErrorList :errors-list="[nameError]" />
			<button
				class="add-category-modal__btn"
				@click.prevent="addCategory"
				:disabled="nameError.length !== 0 || name.length === 0"
			>
				Добавить категорию
			</button>
		</form>
	</TheModal>
</template>

<style lang="scss">
@use "sass:color";
.add-category-modal {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem 0;
	padding: 1rem;
	&__btn {
		width: 450px;
		height: 48px;
		border-radius: 8px;
		background-color: #591c21;
		outline: none;
		border: none;
		text-align: center;
		font-family: "Raleway";
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		color: #fbfbfb;
		transition: all ease 0.2s;
		&:hover {
			background-color: color.adjust($color: #591c21, $lightness: 5%);
		}
		&:focus {
			outline: 1px solid #591c21;
			outline-offset: 1px;
		}
		&:disabled {
			background-color: #7b6063;
			color: #fbfbfb80;
		}
	}
}
</style>
