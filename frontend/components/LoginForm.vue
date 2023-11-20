<script setup lang="ts">
import { Mask } from "maska";
import { ILoginUserResponse } from "~/@types";
const mask = new Mask({ mask: "+7 (###) ### - ## - ##" });

const { $backendUrl } = useNuxtApp();

const notificationStore = useNotificationStore();

const phone = ref<string>("");
const phoneError = ref<string>("");

const password = ref<string>("");
const passwordError = ref<string>("");

const passwordInputType = ref<"password" | "text">("password");

const onPhoneChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.value.length === 0) {
		phoneError.value += "Телефон необходимо указать";
	} else {
		phoneError.value = "";
	}
	phone.value = target.value;
};

const onPasswordChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.validity.patternMismatch) {
		passwordError.value =
			"Пароль должен содержать минимум 8 букв, цифр и символов";
	} else if (target.value.length < 1) {
		passwordError.value = "Пароль необходимо указать";
	} else {
		passwordError.value = "";
	}
	password.value = target.value;
};

const togglePasswordVisibility = (e: MouseEvent) => {
	if (passwordInputType.value === "password") {
		passwordInputType.value = "text";
	} else {
		passwordInputType.value = "password";
	}
};

const isLoginDisabled = computed(() => {
	return !Boolean(password.value && phone.value);
});

const login = async (e: MouseEvent) => {
	const data = await $fetch<ILoginUserResponse>(
		`${$backendUrl()}/api/user/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone: mask.unmasked(phone.value),
				password: password.value,
			}),
		}
	).catch((e) =>
		notificationStore.addErrorNotification(e.data.message, e.data.detail)
	);
	if (data) {
		useCookie("role").value = data.role;
		useCookie("token").value = data.token;
		useCookie("phone").value = data.phone;
		notificationStore.addInfoNotification(
			"Успешная авторизация!",
			"Вы успешно авторизовались"
		);
		return navigateTo("/");
	}
};
</script>

<template>
	<form class="login-form">
		<span class="login-form__header">Вход</span>
		<div class="login-form__inputs">
			<ValidateableInput label="Номер телефона" v-slot="s">
				<input
					:id="s.id"
					type="tel"
					class="labeled-input__input"
					placeholder="+7 (___) ___ - __ - __"
					:value="phone"
					@input="onPhoneChange"
					autocomplete="tel-national"
					v-maska
					data-maska="+7 (###) ### - ## - ##"
				/>
			</ValidateableInput>
			<ValidateableInput label="Пароль" v-slot="s">
				<input
					:id="s.id"
					:type="passwordInputType"
					class="labeled-input__input"
					placeholder="* * * * * * * * *"
					autocomplete="current-password"
					:value="password"
					@input="onPasswordChange"
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
		</div>
		<button
			class="login-form__button"
			@click.prevent="login"
			:disabled="isLoginDisabled"
		>
			Войти
		</button>
		<UITheLink to="/register" class="login-form__link">
			Зарегистрироваться
		</UITheLink>
	</form>
</template>

<style lang="scss">
.login-form {
	width: 434px;
	height: 360px;
	background-color: #ebe3e1;
	border-radius: 20px;
	padding: 0 32px 0 29px;
	&__header {
		display: block;
		height: min-content;
		width: min-content;
		color: #591c21;
		text-align: center;
		font-family: "Raleway";
		font-size: 24px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		padding: 26px 0 29px 159px;
	}
	&__inputs {
		padding-bottom: 26px;
	}
	&__button {
		width: 374px;
		height: 48px;
		background-color: #591c21;
		color: #fbfbfb;
		border-radius: 8px;
		border: none;
		outline: none;
		transition: all ease 0.2s;
		margin-bottom: 16px;
		text-align: center;
		font-family: "Raleway";
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		cursor: pointer;
		&:hover {
			transform: scale(101%);
		}
		&:disabled {
			color: #fbfbfb80;
			background-color: #7b6063;
			cursor: not-allowed;
		}
		&:disabled:hover {
			transform: none;
		}
	}
	&__link {
		margin-left: 96px;
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
