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
const onNameUpdate = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (value.length === 0) {
		nameError.value = "Название необходимо указать";
	} else {
		nameError.value = "";
	}
	name.value = value;
};

const addCategory = async () => {
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
};

const onModalClose = () => {
	name.value = "";
	nameError.value = "";
	emit("canceled");
}
</script>

<template>
	<TheModal header="Добавление категории" @close="onModalClose">
		<div class="form_wrapper">
			<ValidateableInput
				label="Название новой категории"
				type="text"
				placeholder="Раки"
				:error="nameError"
				:value="name"
				@input="onNameUpdate"
			/>
			<button
				class="button"
				@click="addCategory"
				:disabled="nameError.length !== 0 || name.length === 0"
			>
				Добавить категорию
			</button>
		</div>
	</TheModal>
</template>

<style lang="scss" scoped>
.form_wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	.button {
		font-size: 1rem;
		height: 2rem;
		width: fit-content;
		padding: 0 0.25rem;
		border: 2px solid $accent;
		border-radius: 3px;
		background-color: white;
		transition: border-color, scale ease-in-out 0.3s;
		&:hover {
			scale: 105%;
			border-color: $primary;
			transition: border-color, scale ease-in-out 0.3s;
		}
	}
}
</style>
