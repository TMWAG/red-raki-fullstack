<script setup lang="ts">
import { IOrderResponse } from "~/@types";

defineProps<{
	order: IOrderResponse;
}>();

const emit = defineEmits<{
	(e: "closed"): void;
}>();

function onModalClose() {
	emit("closed");
}
</script>

<template>
	<TheModal header="Информация о заказе" @close="onModalClose">
		<div class="view-order-modal">
      {{ order }}
    </div>
	</TheModal>
</template>

<style lang="scss">
.view-order-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
}
</style>
