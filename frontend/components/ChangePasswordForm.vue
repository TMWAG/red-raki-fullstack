<script setup lang="ts">
const emit = defineEmits<{
	(e: "change-attempt", oldPassword: string, newPassword: string): void;
	(e: "canceled"): void;
}>();

defineProps<{
	success: boolean;
}>();

const oldPassword = ref<string>("");
const oldPasswordError = ref<string>("");
function validateOldPassword() {
	if (oldPassword.value.length === 0) {
		oldPasswordError.value = "Старый пароль необходимо указать";
	} else {
		oldPasswordError.value = "";
	}
}

const newPassword = ref<string>("");
const newPasswordError = ref();
const newPasswordConfirmation = ref<string>("");
const newPasswordConfirmationError = ref();
function validateNewPassword() {
	if (newPassword.value.length < 8) {
		newPasswordError.value = "Новый пароль слишком короткий";
	} else if (newPassword.value !== newPasswordConfirmation.value) {
		newPasswordError.value = undefined;
		newPasswordConfirmationError.value = "Пароли не совпадают";
	} else {
		newPasswordError.value = undefined;
		newPasswordConfirmationError.value = undefined;
	}
}

function onPasswordChange() {
	emit("change-attempt", oldPassword.value, newPassword.value);
}

function onModalClose() {
	oldPassword.value = "";
	oldPasswordError.value = "";
	newPassword.value = "";
	newPasswordError.value = "";
	newPasswordConfirmation.value = "";
	newPasswordConfirmationError.value = "";
	emit("canceled");
}

const isButtonDisabled = computed(() =>
	Boolean(
		oldPasswordError.value ||
			newPasswordError.value ||
			newPasswordConfirmationError.value ||
			!oldPassword.value ||
			!newPassword.value ||
			!newPasswordConfirmation
	)
);
</script>

<template>
	<TheModal header="Изменение пароля" @close="onModalClose">
		<UIFormWrapper>
			<template v-if="!success">
				<input type="text" hidden autocomplete="username" />
				<UIPasswordInput
					label="Старый пароль"
					placeholder="StArIy_PaRoL"
					v-model="oldPassword"
					autocomplete="current-password"
					@focus="validateOldPassword"
					@update:model-value="validateOldPassword"
				/>
				<UIPasswordInput
					label="Новый пароль"
					placeholder="NoViY_PaRoL"
					v-model="newPassword"
					autocomplete="new-password"
					@focus="validateNewPassword"
					@update:model-value="validateNewPassword"
				/>
				<UIPasswordInput
					label="Новый пароль ещё раз"
					placeholder="NoViY_PaRoL"
					v-model="newPasswordConfirmation"
					autocomplete="new-password"
					@focus="validateNewPassword"
					@update:model-value="validateNewPassword"
				/>
				<UIErrorList
					:errors-list="[
						oldPasswordError,
						newPasswordError,
						newPasswordConfirmationError,
					]"
				/>
				<UITheButton
					:disabled="isButtonDisabled"
					@click.prevent="onPasswordChange"
				>
					Изменить пароль
				</UITheButton>
			</template>
			<template v-else>
				<p>Пароль успешно изменён</p>
			</template>
		</UIFormWrapper>
	</TheModal>
</template>

<style module lang="scss"></style>
