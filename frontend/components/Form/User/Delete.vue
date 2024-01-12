<script setup lang="ts">
import { ICreateUserResponse } from "~/@types";

const { $backendUrl } = useNuxtApp();

const props = defineProps<{
	userToDelete: ICreateUserResponse;
}>();

const emit = defineEmits<{
	(e: "canceled"): void;
	(e: "deleted"): void;
}>();

const confirmation = ref<string>("");
const confirmationError = ref<string>("");
function validateConfirmation(
) {
	if (confirmation.value.length === 0) {
		confirmationError.value = "Подтверждение необходимо указать";
	} else if (confirmation.value !== props.userToDelete.login) {
		confirmationError.value = "Подтверждение не совпадает";
	} else {
		confirmationError.value = "";
	}
}

const success = ref();

function onModalClose() {
  confirmation.value = "";
  confirmationError.value = "";
  emit("canceled");
}
</script>

<template>
	<TheModal
		:header="`Удаление пользователя ${userToDelete.name} ${userToDelete.surname}`"
    @close="onModalClose"
	>
    <UIFormWrapper>
      <template v-if="!success">
        <UITextInput
          :placeholder="userToDelete.login"
          label="Подтверждение удаления"
          v-model="confirmation"
          @input="validateConfirmation"
          @focus.self="validateConfirmation"
        />
      </template>
      <template v-else>

      </template>
    </UIFormWrapper>
	</TheModal>
</template>
