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
		<UIFormWrapper>
			<UITextInput
				label="Название удаляемой категории"
				:placeholder="categoryToDelete.name"
				v-model="deleteConfirmation"
				@input="validateConfirmation"
				@focus="validateConfirmation"
			/>
			<UIErrorList :errors-list="[confirmationError]" />
			<UITheButton
				@click.prevent="deleteCategory"
				:disabled="deleteConfirmation !== categoryToDelete.name"
			>
				Удалить категорию
			</UITheButton>
		</UIFormWrapper>
	</TheModal>
</template>
