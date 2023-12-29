<script setup lang="ts">
import { ICategory } from "~/@types";

const props = defineProps<{
	categoryToUpdate: ICategory;
}>();
const emit = defineEmits<{
	(e: "edited"): void;
	(e: "canceled"): void;
}>();

const { $backendUrl } = useNuxtApp();
const notificationStore = useNotificationStore();

const newName = ref<string>("");
const newNameError = ref<string>("");
function validateNewName() {
	if (newName.value.length === 0) {
		newNameError.value = "Новое название должно быть указано";
	} else {
		newNameError.value = "";
	}
}

async function updateCategory() {
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
}

function onModalClose() {
	newName.value = "";
	newNameError.value = "";
	emit("canceled");
}

onMounted(() => {
	newName.value = props.categoryToUpdate.name;
});
</script>

<template>
	<TheModal
		@close="onModalClose"
		:header="`Изменение категории ${categoryToUpdate.name}`"
	>
		<form class="edit-category-modal">
			<UITextInput
				label="Новое название категории"
				placeholder="Раки"
				v-model="newName"
				@input="validateNewName"
				@focus="validateNewName"
			/>
			<UIErrorList
				:errors-list="[
					newNameError
				]"
			/>
			<button
				class="edit-category-modal__btn"
				@click.prevent="updateCategory"
				:disabled="newNameError.length !== 0"
			>
				Сохранить изменения
			</button>
		</form>
	</TheModal>
</template>

<style lang="scss">
@use "sass:color";
.edit-category-modal {
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
			background-color: #7B6063;
			color: #FBFBFB80;
		}
	}
}
</style>
