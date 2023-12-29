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
		<form class="delete-product-modal">
			<UITextInput
				label="Название товара"
				:placeholder="product.name"
				v-model="delConfirmation"
				@input="validateConfirmation"
				@focus="validateConfirmation"
			/>
			<UIErrorList :errors-list="[confirmationError]" />
			<button
				class="delete-product-modal__btn"
				@click.prevent="deleteProduct"
				:disabled="sendButtonDisabled"
			>
				Удалить
			</button>
		</form>
	</TheModal>
</template>

<style lang="scss">
@use "sass:color";
.delete-product-modal {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 14px;
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
