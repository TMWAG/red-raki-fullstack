<script setup lang="ts">
import { ILoginUserResponse } from "~/@types";

const { $backendUrl } = useNuxtApp();

const notificationStore = useNotificationStore();

const login = ref<string>("");
const loginError = ref<string>("");
function validateLogin() {
	if (login.value.length === 0) {
		loginError.value = "Логин необходимо указать";
	} else {
		loginError.value = "";
	}
};

const password = ref<string>("");
const passwordError = ref<string>("");
function validatePassword() {
	if (password.value.length === 0) {
		passwordError.value = "Пароль необходимо указать";
	} else {
		passwordError.value = "";
	}
};

const isLoginDisabled = computed(() => {
	return !Boolean(password.value && login.value);
});

const logIn = async () => {
	const data = await $fetch<ILoginUserResponse>(
		`${$backendUrl()}/api/user/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				login: login.value,
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
useHead({
  title: 'Авторизация',
})
</script>

<template>
  <div :class="$style['form-wrapper']">
    <form :class="$style['login-form']">
      <span :class="$style['login-form__header']">Вход</span>
      <div :class="$style['login-form__inputs']">
        <UITextInput
          label="Логин"
          placeholder="login"
          v-model="login"
          autocomplete="username"
          @input="validateLogin"
          @focus="validateLogin"
        />
        <UIPasswordInput
          v-model="password"
          autocomplete="current-password"
          @input="validatePassword"
          @focus="validatePassword"
        />
      </div>
      <UIErrorList
        :errors-list="[
          loginError,
          passwordError
        ]"
      />
      <button
        :class="$style['login-form__button']"
        @click.prevent="logIn"
        :disabled="isLoginDisabled"
      >
        Войти
      </button>
    </form>
  </div>
</template>

<style lang="scss" module>
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
}
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
}
</style>