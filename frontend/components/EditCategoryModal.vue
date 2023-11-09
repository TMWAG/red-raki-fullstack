<script setup lang="ts">
import { ICategory } from "~/@types";

const props = defineProps<{
	categoryToUpdate: {
		id: string;
		name: string;
	};
}>();
const emit = defineEmits<{
	(e: "edited"): void;
	(e: "canceled"): void;
}>();

const newName = ref<string>("");
const newNameError = ref<string>("");

const { $backendUrl } = useNuxtApp();
const notificationStore = useNotificationStore();

const onNewNameChange = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (value.length === 0) {
		newNameError.value = "Новое название должно быть указано";
	} else {
		newNameError.value = "";
	}
	newName.value = value;
};

const updateCategory = async () => {
	await $fetch<ICategory>(
		`${$backendUrl()}/api/category/${props.categoryToUpdate.id}`,
		{
			method: "PATCH",
			body: JSON.stringify({
				name: newName.value,
			}),
			headers: {
				Authorization: `Bearer ${useCookie("token").value}`,
			},
		}
	).catch((e) => notificationStore.addErrorNotification("Ошибка изменения", e));
	notificationStore.addInfoNotification(
		"Успешное изменение категории",
		`Название категории успешно изменено с ${props.categoryToUpdate.name} на ${newName.value}`
	);
	newNameError.value = "";
	emit("edited");
};

const onModalClose = () => {
	newName.value = "";
	newNameError.value = "";
	emit("canceled");
};

onMounted(() => {
  newName.value = props.categoryToUpdate.name;
});
</script>

<template>
	<TheModal
		@close="onModalClose"
		:header="`Изменение категории ${categoryToUpdate.name}`"
	>
		<div class="form_wrapper">
			<ValidateableInput
				label="Новое название категории"
				type="text"
				@input="onNewNameChange"
				placeholder="Раки"
				:error="newNameError"
				:value="newName"
			/>
			<button
				class="button"
				@click="updateCategory"
				:disabled="newNameError.length !== 0"
			>
				Изменить категорию
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
	gap: 0.5rem 0;
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
