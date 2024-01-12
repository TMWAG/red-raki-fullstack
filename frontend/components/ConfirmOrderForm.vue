<script setup lang="ts">
const emit = defineEmits<{
	(e: "confirmed", phone: string, address: string): void;
}>();

const phone = ref<string>(useCookie("phone").value || "");
const address = ref<string>("");

const isUserAuthorized = Boolean(
	useCookie("phone").value &&
		useCookie("token").value &&
		useCookie("role").value
);
</script>

<template>
	<form class="confirm-order-form">
		<ValidateableInput label="Номер телефона" v-slot="s">
			<input
				:id="s.id"
				type="tel"
				placeholder="+7 (999) 333 - 22 - 11"
				v-maska
				data-maska="+7(###)###-##-##"
				class="labeled-input__input sm"
				v-model="phone"
				:disabled="isUserAuthorized"
			/>
		</ValidateableInput>
		<ValidateableInput label="Адрес" v-slot="s">
			<input
				:id="s.id"
				type="text"
				placeholder="Королёв, Терешковой, 12"
				v-model="address"
				class="labeled-input__input sm"
			/>
		</ValidateableInput>
		<button
			class="confirm-order-form__btn"
			@click.prevent="emit('confirmed', phone, address)"
		>
			Оформить заказ
		</button>
	</form>
</template>

<style lang="scss">
@use "sass:color";
.confirm-order-form {
	background-color: #ebe3e1;
	border-radius: 24px;
	padding: 20px;
	gap: 14px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&__btn {
		width: 187px;
		height: 36px;
		border-radius: 8px;
		background-color: #591c21;
		color: #fbfbfb;
		border: none;
		outline: none;
		transition: all ease 0.2s;
		&:disabled {
			background-color: #7b6063;
			color: #fbfbfb80;
			cursor: not-allowed;
		}
		&:not(:disabled) {
			&:hover {
				background-color: color.adjust($color: #591c21, $lightness: 5%);
			}
			&:focus {
				outline: solid 1px #591c21;
				outline-offset: 1px;
			}
		}
	}
}
</style>
