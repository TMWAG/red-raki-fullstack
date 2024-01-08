<script setup lang="ts">
import { IProduct } from "~/@types";

const notificationStore = useNotificationStore();

const { $backendUrl } = useNuxtApp();

const props = defineProps<{
	product: IProduct;
}>();

const emit = defineEmits<{
	(e: "deleted"): void;
	(e: "canceled"): void;
}>();

const delConfirmation = ref<string>("");
const confirmationError = ref<string>("");
function validateConfirmation() {
	if (delConfirmation.value.length === 0) {
		confirmationError.value = "Подтверждение необходимо указать";
	} else if (delConfirmation.value !== props.product.name) {
		confirmationError.value = "Подтверждение не совпадает";
	} else {
		confirmationError.value = "";
	}
}

const sendButtonDisabled = computed(() => {
	return Boolean(!delConfirmation.value || confirmationError.value);
});

async function deleteProduct() {
	const req = await $fetch(`${$backendUrl()}/api/product/${props.product.id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${useCookie("token").value}`,
		},
	}).catch((e) => notificationStore.addErrorNotification("Ошибка удаления", e));
	if (req) {
		notificationStore.addInfoNotification(
			"Товар успешно удалён",
			`Товар ${props.product.name} успешно удалён`
		);
		emit("deleted");
	}
}
</script>

<template>
	<TheModal
		:header="`Удаление товара ${product.name}`"
		@close="emit('canceled')"
	>
		<UIFormWrapper>
			<UITextInput
				label="Название товара"
				:placeholder="product.name"
				v-model="delConfirmation"
				@input="validateConfirmation"
				@focus="validateConfirmation"
			/>
			<UIErrorList :errors-list="[confirmationError]" />
			<UITheButton @click.prevent="deleteProduct" :disabled="sendButtonDisabled"
				>Удалить</UITheButton
			>
		</UIFormWrapper>
	</TheModal>
</template>
