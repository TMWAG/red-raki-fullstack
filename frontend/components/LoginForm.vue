<script setup lang="ts">
import { ILoginUserResponse } from "~/@types";

const { $backendUrl } = useNuxtApp();

const notificationStore = useNotificationStore();

const phone = ref<string>("");
const phoneError = ref<string>("");

const password = ref<string>("");
const passwordError = ref<string>("");

const passwordInputType = ref<"password" | "text">("password");
const showPasswordButtonText = ref<"Показать пароль" | "Скрыть пароль">(
	"Показать пароль"
);

const onPhoneChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.validity.patternMismatch) {
		phoneError.value = "Телефон имеет неверный формат";
	} else if (target.value.length === 0) {
		phoneError.value += " телефон необходимо указать";
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
		showPasswordButtonText.value = "Скрыть пароль";
	} else {
		passwordInputType.value = "password";
		showPasswordButtonText.value = "Показать пароль";
	}
};

const login = async (e: MouseEvent) => {
	const data = await $fetch<ILoginUserResponse>(
		`${$backendUrl()}/api/user/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				phone: phone.value,
				password: password.value,
			}),
		}
	).catch((e) =>
		notificationStore.addErrorNotification("Ошибка авторизации!", e)
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
	<div class="wrapper">
		<span>Вход</span>
		<ValidateableInput
			label="Номер телефона"
			type="tel"
			placeholder="+79993332211"
			:value="phone"
			pattern="^((\+7|7|8)+([0-9]){10})$"
			@input="onPhoneChange"
			:error="phoneError"
		/>
		<ValidateableInput
			label="Пароль"
			:type="passwordInputType"
			placeholder="VaSh_PaRol'"
			:value="password"
			pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
			@input="onPasswordChange"
			:error="passwordError"
		/>
		<button
			class="button"
			:class="passwordInputType === 'text' ? 'active' : ''"
			@click="togglePasswordVisibility"
		>
			{{ showPasswordButtonText }}
		</button>
		<button class="button" @click="login">Войти</button>
		<NuxtLink to="/register" class="nav_link" active-class="active"
			>Зарегистрироваться</NuxtLink
		>
	</div>
</template>

<style lang="scss" scoped>
@use "/assets/colors";
span {
	font-size: 1.5rem;
}
.button {
	font-size: 1rem;
	height: 2rem;
	width: fit-content;
	padding: 0.25rem;
	border: 2px solid colors.$accent;
	border-radius: 3px;
	background-color: white;
	transition: border-color, scale ease-in-out 0.3s;
	margin-bottom: 0.5rem;
	&:hover {
		scale: 105%;
		border-color: colors.$primary;
		transition: border-color, scale ease-in-out 0.3s;
	}
	&:disabled {
		background-color: colors.$white;
		cursor: not-allowed;
	}
	&:disabled:hover {
		scale: 100%;
		border-color: colors.$accent;
	}
	&.active {
		border-color: colors.$primary;
		transition: border-color, scale ease-in-out 0.3s;
	}
}
.wrapper {
	height: 40rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border: 2px solid colors.$accent;
	border-radius: 5px;
	background-color: colors.$white;
	padding: 1rem;
}
.nav_link {
	text-decoration: none;
	background-image: linear-gradient(
		to right,
		colors.$primary,
		colors.$primary 50%,
		colors.$warn 50%
	);
	background-size: 200% 100%;
	background-position: -100%;
	display: inline-block;
	position: relative;
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	transition: all 0.3s ease-in-out;
	&:before {
		content: "";
		background: colors.$primary;
		display: block;
		position: absolute;
		bottom: -3px;
		left: 0;
		width: 0;
		height: 3px;
		transition: all 0.3s ease-in-out;
	}
	&:hover {
		background-position: 0;
	}
	&:hover::before {
		width: 100%;
	}
	&:focus {
		background-position: 0;
	}
	&:focus::before {
		width: 100%;
	}
	&.active {
		background-position: 0;
		&::before {
			width: 100%;
		}
	}
}
</style>
