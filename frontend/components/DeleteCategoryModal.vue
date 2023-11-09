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

const onConfirmationChange = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (value !== props.categoryToDelete.name) {
		confirmationError.value = "Название не совпадает";
	} else {
		confirmationError.value = "";
	}
	deleteConfirmation.value = value;
};

const deleteCategory = async () => {
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
};

const onModalClose = () => {
  deleteConfirmation.value = "";
  confirmationError.value = "";
  emit("canceled");
}
</script>

<template>
  <TheModal
    @close="onModalClose"
    header="Удаление категории"
  >
    <div class="form_wrapper">
      <ValidateableInput
        label="Название удаляемой категории"
        type="text"
        @input="onConfirmationChange"
        :placeholder="props.categoryToDelete.name"
        :error="confirmationError"
        :value="deleteConfirmation"
      />
      <button
        class="button"
        @click="deleteCategory"
        :disabled="deleteConfirmation !== props.categoryToDelete.name"
      >
        Удалить категорию
      </button>
    </div>
  </TheModal>
</template>

<style lang="scss" scoped>
@use "assets/colors";
.form_wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
  gap: .5rem 0;
	padding: 1rem;
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
}
</style>
