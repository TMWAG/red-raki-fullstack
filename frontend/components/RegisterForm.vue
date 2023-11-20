<script setup lang="ts">
import { Mask } from "maska";
import { IRegisterUserResponse } from "~/@types";
const mask = new Mask({ mask: "+7 (###) ### - ## - ##" });

const notificationStore = useNotificationStore();

const phone = ref<string>("");
const phoneError = ref<string>("");
function checkPhoneValidity() {
	if (phone.value.length < 4) {
		phoneError.value = "Телефон необходимо указать";
	} else if (
		!/^((\+7)+\(([0-9]){3}\)([0-9]){3})(\-([0-9]){2}){2}$/gm.test(phone.value)
	) {
		phoneError.value = "Телефон имеет неверный формат";
	} else {
		phoneError.value = "";
	}
}

const password = ref<string>("");
const passwordError = ref<string>("");
function checkPasswordValidity() {
	if (password.value.length === 0) {
		passwordError.value = "Пароль необходимо указать";
	} else if (password.value.length < 8) {
		passwordError.value = "Пароль слишком короткий";
	} else {
		passwordError.value = "";
	}
	if (
		passwordConfirmation.value.length > 0 &&
		passwordConfirmation.value !== password.value
	) {
		passwordConfirmationError.value = "Пароли не совпадают";
	} else {
		passwordConfirmationError.value = "";
	}
}

const passwordConfirmation = ref<string>("");
const passwordConfirmationError = ref<string>("");
function checkPasswordConfirmationValidity() {
	if (password.value !== passwordConfirmation.value) {
		passwordConfirmationError.value = "Пароли не совпадают";
	} else {
		passwordConfirmationError.value = "";
	}
}

const passwordInputType = ref<"password" | "text">("password");
function togglePasswordVisibility() {
	if (passwordInputType.value === "password") {
		passwordInputType.value = "text";
	} else {
		passwordInputType.value = "password";
	}
}

const isRegisterButtonDisabled = computed(() => {
	return !(
		password.value === passwordConfirmation.value &&
		password.value.length !== 0 &&
		passwordError.value.length === 0 &&
		passwordConfirmationError.value.length === 0 &&
		phoneError.value.length === 0
	);
});

const register = async (e: MouseEvent) => {
	const data = await $fetch<IRegisterUserResponse>(
		useRuntimeConfig().public.apiUrl.concat("/api/user/register"),
		{
			method: "POST",
			body: JSON.stringify({
				phone: mask.unmasked(phone.value),
				password: password.value,
			}),
		}
	).catch((e) =>
		notificationStore.addErrorNotification("Ошибка регистрации", e.data.message)
	);
	if (data) {
		notificationStore.addInfoNotification(
			"Успешная регистрация!",
			"Вы успешно зарегистрировались и теперь можете войти!"
		);
		return navigateTo("/");
	}
};
</script>

<template>
	<form class="register-form">
		<span class="register-form__header">Регистрация</span>
		<div class="register-form__inputs">
			<ValidateableInput label="Номер телефона" v-slot="s">
				<input
					:id="s.id"
					type="tel"
					class="labeled-input__input"
					placeholder="+7 (___) ___ - __ - __"
					v-model="phone"
					autocomplete="tel-local"
					v-maska
					data-maska="+7(###)###-##-##"
					@input="checkPhoneValidity"
					@focus="checkPhoneValidity"
				/>
			</ValidateableInput>
			<ValidateableInput label="Пароль" v-slot="s">
				<input
					:id="s.id"
					:type="passwordInputType"
					class="labeled-input__input"
					placeholder="VaSh_PaRol_123"
					v-model="password"
					autocomplete="new-password"
					@input="checkPasswordValidity"
					@focus="checkPasswordValidity"
				/>
				<button
					class="labeled-input__switch"
					:class="passwordInputType === 'text' ? 'active' : ''"
					@click.prevent="togglePasswordVisibility"
				>
					<svg
						v-if="passwordInputType === 'text'"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 4L20 20"
							stroke="#C8C8C8"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M10.8572 5.76588C11.2304 5.72237 11.6116 5.70001 12 5.70001C16.1976 5.70001 19.5599 8.31239 21 12C20.6449 12.9094 20.1728 13.7534 19.6002 14.5089M7.06766 7.0675C5.23159 8.18766 3.811 9.92334 3 12C4.44012 15.6876 7.80243 18.3 12 18.3C13.8338 18.3 15.5082 17.8014 16.9325 16.9324M10.0909 10.0907C9.60224 10.5794 9.3 11.2544 9.3 12C9.3 13.4912 10.5088 14.7 12 14.7C12.7456 14.7 13.4207 14.3978 13.9093 13.9091"
							stroke="#C8C8C8"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M4.79999 4.79999L19.2 19.2"
							stroke="#C8C8C8"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
					<svg
						v-else
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g style="mix-blend-mode: multiply">
							<path
								d="M14.7 12C14.7 13.4911 13.4912 14.7 12 14.7C10.5088 14.7 9.3 13.4911 9.3 12C9.3 10.5088 10.5088 9.29995 12 9.29995C13.4912 9.29995 14.7 10.5088 14.7 12Z"
								stroke="#C8C8C8"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M3 12C4.44012 8.31233 7.80243 5.69995 12 5.69995C16.1976 5.69995 19.5599 8.31233 21 12C19.5599 15.6876 16.1976 18.3 12 18.3C7.80243 18.3 4.44012 15.6876 3 12Z"
								stroke="#C8C8C8"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</g>
					</svg>
				</button>
			</ValidateableInput>
			<ValidateableInput label="Пароль ещё раз" v-slot="s">
				<input
					:id="s.id"
					:type="passwordInputType"
					class="labeled-input__input"
					placeholder="VaSh_PaRol_123"
					v-model="passwordConfirmation"
					autocomplete="new-password"
					@input="checkPasswordConfirmationValidity"
					@focus="checkPasswordConfirmationValidity"
				/>
			</ValidateableInput>
		</div>
		<div class="register-form__error-list">
			<span v-if="phoneError" class="register-form__error">{{
				phoneError
			}}</span>
			<span v-if="passwordError" class="register-form__error">{{
				passwordError
			}}</span>
			<span v-if="passwordConfirmationError" class="register-form__error">{{
				passwordConfirmationError
			}}</span>
		</div>
		<button
			class="register-form__button"
			@click.prevent="register"
			:disabled="isRegisterButtonDisabled"
		>
			Зарегистрироваться
		</button>
		<UITheLink to="/login" class="register-form__link">Войти</UITheLink>
	</form>
</template>

<style lang="scss">
@use "sass:color";
.register-form {
	width: 434px;
	min-height: 434px;
	border-radius: 20px;
	background-color: #ebe3e1;
	padding: 23px 32px 32px 28px;
	margin-top: 1;
	&__header {
		color: #591c21;
		text-align: center;
		font-family: "Raleway";
		font-size: 24px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		padding-left: 120px;
	}
	&__inputs {
		padding-top: 29px;
		padding-bottom: 7px;
	}
	&__error-list {
		display: flex;
		flex-direction: column;
		min-height: 17px;
		padding-bottom: 11px;
	}
	&__error {
		color: #d40000;
		font-family: "Raleway";
		font-size: 13px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0.26px;
	}
	&__button {
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
	&__link {
		margin-left: 160px;
		padding-top: 16px;
		font-weight: 600;
		background-image: linear-gradient(
			to right,
			#591c21,
			#591c21 50%,
			#911d28 50%
		);
	}
}
</style>
