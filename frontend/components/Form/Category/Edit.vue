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
		<UIFormWrapper>
			<UITextInput
				label="Новое название категории"
				placeholder="Раки"
				v-model="newName"
				@input="validateNewName"
				@focus="validateNewName"
			/>
			<UIErrorList :errors-list="[newNameError]" />
			<UITheButton
				@click.prevent="updateCategory"
				:disabled="newNameError.length !== 0"
				>Сохранить изменения</UITheButton
			>
		</UIFormWrapper>
	</TheModal>
</template>

