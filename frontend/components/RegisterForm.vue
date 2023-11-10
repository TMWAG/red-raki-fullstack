<script setup lang="ts">
import { IRegisterUserResponse } from '~/@types';

const notificationStore = useNotificationStore();

const phone = ref<string>("");
const phoneError = ref<string>("");

const password = ref<string>("");
const passwordError = ref<string>("");

const passwordConfirmation = ref<string>("");
const passwordConfirmationError = ref<string>("");

const passwordInputType = ref<"password" | "text">("password");
const showPasswordButtonText = ref<"Показать пароль" | "Скрыть пароль">(
	"Показать пароль"
);

const registerButtonActive = computed(() => {
	return !(
		password.value === passwordConfirmation.value &&
		/^((\+7|7|8)+([0-9]){10})$/.test(phone.value)
	);
});

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
	} else if (target.validity.tooShort) {
		passwordError.value = "Пароль необходимо указать";
	} else {
		passwordError.value = "";
	}
	password.value = target.value;
	if (
		passwordConfirmation.value.length > 0 &&
		passwordConfirmation.value !== password.value
	) {
		passwordConfirmationError.value = "Пароли не совпадают";
	} else {
		passwordConfirmationError.value = "";
	}
};

const onPasswordConfirmationChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if ((e.target as HTMLInputElement).value !== password.value) {
		passwordConfirmationError.value = "Пароли не совпадают";
	} else {
		passwordConfirmationError.value = "";
	}
	passwordConfirmation.value = target.value;
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

const register = async (e: MouseEvent) => {
	const data = await $fetch<IRegisterUserResponse>(
		useRuntimeConfig().public.apiUrl.concat("/user/register"),
		{
			method: "POST",
			body: JSON.stringify({
				phone: phone.value,
				password: password.value,
			}),
		}
	).catch((e) => 
		notificationStore.addErrorNotification(
			"Ошибка регистрации",
			e
		)
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
	<div class="wrapper">
		<span>Регистрация </span>
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
			placeholder="VaSh_PaRoL'"
			:value="password"
			pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
			@input="onPasswordChange"
			:error="passwordError"
		/>
		<ValidateableInput
			label="Пароль ещё раз"
			:type="passwordInputType"
			placeholder="VaSh_PaRoL'"
			:value="passwordConfirmation"
			@input="onPasswordConfirmationChange"
			:error="passwordConfirmationError"
		/>
		<button
			class="button"
			:class="passwordInputType === 'text' ? 'active' : ''"
			@click="togglePasswordVisibility"
		>
			{{ showPasswordButtonText }}
		</button>
		<button
			class="button"
			@click.prevent="register"
			:disabled="registerButtonActive"
		>
			Зарегистрироваться
		</button>
		<NuxtLink to="/login" class="nav_link" active-class="active"
			>Войти</NuxtLink
		>
	</div>
</template>

<style lang="scss" scoped>
span {
	font-size: 1.5rem;
}
.button {
	font-size: 1rem;
	height: 2rem;
	width: fit-content;
	padding: 0.25rem;
	border: 2px solid $accent;
	border-radius: 3px;
	background-color: white;
	transition: border-color, scale ease-in-out 0.3s;
	margin-bottom: 0.5rem;
	&:hover {
		scale: 105%;
		border-color: $primary;
		transition: border-color, scale ease-in-out 0.3s;
	}
	&:disabled {
		background-color: $white;
		cursor: not-allowed;
	}
	&:disabled:hover {
		scale: 100%;
		border-color: $accent;
	}
	&.active {
		border-color: $primary;
		transition: border-color, scale ease-in-out 0.3s;
	}
}
.wrapper {
	height: 40rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border: 2px solid $accent;
	border-radius: 5px;
	background-color: $white;
	padding: 1rem;
}
.nav_link {
	text-decoration: none;
	background-image: linear-gradient(
		to right,
		$primary,
		$primary 50%,
		$warn 50%
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
		background: $primary;
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
