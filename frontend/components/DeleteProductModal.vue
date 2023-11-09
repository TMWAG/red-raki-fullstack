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
const onConfirmationChange = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (value === props.product.name) {
    confirmationError.value = "";
  } else {
		confirmationError.value = "Подтверждение не совпадает";
	}
	delConfirmation.value = value;
};

const sendButtonDisabled = computed(() => {
  return Boolean(!delConfirmation.value || confirmationError.value);
})

const onDelete = async () => {
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
};
</script>

<template>
  <TheModal
    :header="`Удаление товара: ${props.product.name}`"
    @close="emit('canceled')"
  >
    <div class="form_wrapper">
      <ValidateableInput
        :value="delConfirmation"
        :error="confirmationError"
        @input="onConfirmationChange"
        :placeholder="product.name"
        type="text"
        label="Подтверждение удаления"
      />
      <button
        class="button"
        @click.prevent="onDelete"
        :disabled="sendButtonDisabled"
      >Удалить</button>
    </div>
  </TheModal>
</template>

<style lang="scss" scoped>
@use '/assets/colors';
.form_wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
}
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
</style>
