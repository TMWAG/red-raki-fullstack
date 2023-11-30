<script setup lang="ts">
const emit = defineEmits<{
	(e: 'confirmed', phone: string, address: string): void
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
		<div>
			<ValidateableInput label="Номер телефона" lg v-slot="s">
				<input
					:id="s.id"
					type="tel"
					placeholder="+7 (999) 333 - 22 - 11"
					v-maska
					data-maska="+7(###)###-##-##"
					class="labeled-input__input labeled-input__input_lg"
					v-model="phone"
					:disabled="isUserAuthorized"
				/>
			</ValidateableInput>
			<ValidateableInput label="Адрес" lg v-slot="s">
				<input
					:id="s.id"
					type="text"
					placeholder="Королёв, Терешковой, 12"
					v-model="address"
					class="labeled-input__input labeled-input__input_lg"
				/>
			</ValidateableInput>
			<button class="confirm-order-form__btn" @click.prevent="emit('confirmed', phone, address)">Оформить заказ</button>
		</div>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse enim natus,
			cum incidunt odio quae autem sequi atque vero porro laudantium? Ducimus et
			adipisci temporibus ut alias quisquam optio odit.
		</p>
	</form>
</template>

<style lang="scss">
@use "sass:color";
.confirm-order-form {
	background-color: whitesmoke;
	border: 2px solid darkred;
	border-radius: 5px;
	padding: 1rem;
	display: grid;
	align-items: center;
	grid-template-columns: 4fr 8fr;
	&__btn {
		width: 374px;
		height: 48px;
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
