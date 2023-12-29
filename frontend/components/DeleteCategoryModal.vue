<script setup lang="ts">
import { IDeleteCategoryResponse } from "~/@types";

const props = defineProps<{
	categoryToDelete: {
		id: string;
		name: string;
	};
}>();

const emit = defineEmits<{
	(e: "deleted"): void;
	(e: "canceled"): void;
}>();

const { $backendUrl } = useNuxtApp();
const notificationStore = useNotificationStore();

const deleteConfirmation = ref<string>("");
const confirmationError = ref<string>("");
function validateConfirmation() {
	if (deleteConfirmation.value !== props.categoryToDelete.name) {
		confirmationError.value = "Название не совпадает";
	} else {
		confirmationError.value = "";
	}
}

async function deleteCategory() {
	await $fetch<IDeleteCategoryResponse>(
		`${$backendUrl()}/api/category/${props.categoryToDelete.id}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${useCookie("token").value}`,
			},
		}
	).catch((e) => notificationStore.addErrorNotification("Ошибка удаления", e));
	notificationStore.addInfoNotification(
		"Успешное удаление категории",
		`Категория ${props.categoryToDelete.name} успешно удалена`
	);
	deleteConfirmation.value = "";
	emit("deleted");
}

function onModalClose() {
	deleteConfirmation.value = "";
	confirmationError.value = "";
	emit("canceled");
}
</script>

<template>
	<TheModal
		@close="onModalClose"
		:header="`Удаление категории ${categoryToDelete.name}`"
	>
		<form class="delete-category-modal">
			<UITextInput
				label="Название удаляемой категории"
				:placeholder="categoryToDelete.name"
				v-model="deleteConfirmation"
				@input="validateConfirmation"
				@focus="validateConfirmation"
			/>
			<UIErrorList
				:errors-list="[
					confirmationError,
				]"
			/>
			<button
				class="delete-category-modal__btn"
				@click.prevent="deleteCategory"
				:disabled="deleteConfirmation !== props.categoryToDelete.name"
			>
				Удалить категорию
			</button>
		</form>
	</TheModal>
</template>

<style lang="scss">
@use "sass:color";
.delete-category-modal {
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
