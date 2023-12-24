<script setup lang="ts">
import { ICreateUserResponse } from "~/@types";

const { $backendUrl } = useNuxtApp();
const notificationStore = useNotificationStore();

const emit = defineEmits<{
	(e: "canceled"): void;
	(e: "created"): void;
}>();

const name = ref<string>("");
const nameError = ref<string>("");
function validateName() {
	if (name.value.length === 0) {
		nameError.value = "Имя необходимо указать";
	} else {
		nameError.value = "";
	}
}

const surname = ref<string>("");
const surnameError = ref<string>("");
function validateSurname() {
	if (surname.value.length === 0) {
		surnameError.value = "Фамилию необходимо указать";
	} else {
		surnameError.value = "";
	}
}

const roleList = [
	{ id: "SUPERVISOR", name: "Супервайзер" },
	{ id: "ADMIN", name: "Администратор" },
] as const;
const role = ref<"ADMIN" | "SUPERVISOR">(roleList[0].id);
const roleName = ref<"Администратор" | "Супервайзер">(roleList[0].name);
function onRoleChange(id: "ADMIN" | "SUPERVISOR") {
	roleName.value = roleList.find((r) => r.id === id)!.name;
	role.value = id;
}

const newUser = ref<ICreateUserResponse>();

async function onUserCreated() {
	try {
		newUser.value = await $fetch<ICreateUserResponse>(
			`${$backendUrl()}/api/user/add_user`,
			{
				method: "post",
				body: JSON.stringify({
					name: name.value,
					surname: surname.value,
					role: role.value,
				}),
				headers: {
					Authorization: `Bearer ${useCookie("token").value}`,
				},
			}
		);
		emit("created");
	} catch (e: any) {
		notificationStore.addErrorNotification(e.message, e.detail);
	}
}

function onModalClose() {
	name.value = "";
	nameError.value = "";
	surname.value = "";
	surnameError.value = "";
	emit("canceled");
}
</script>

<template>
	<TheModal header="Добавление пользователя" @close="onModalClose">
		<div :class="$style['add-user-form']">
			<template v-if="!newUser">
				<ValidateableInput label="Имя нового пользователя" lg v-slot="s">
					<input
						:id="s.id"
						placeholder="Рамиль"
						type="text"
						class="labeled-input__input lg"
						v-model="name"
						@input="validateName"
						@focus="validateName"
					/>
				</ValidateableInput>
				<ValidateableInput label="Фамилия нового пользователя" lg v-slot="s">
					<input
						:id="s.id"
						placeholder="Марданов"
						type="text"
						class="labeled-input__input lg"
						v-model="surname"
						@input="validateSurname"
						@focus="validateSurname"
					/>
				</ValidateableInput>
				<ValidateableInput label="Роль нового пользователя" lg v-slot="s">
					<UITheSelect
						:list="[
							{ id: 'ADMIN', name: 'Администратор' },
							{ id: 'SUPERVISOR', name: 'Супервайзер' },
						]"
						:selected="roleName"
						@selected="onRoleChange"
						:id="s.id"
					/>
				</ValidateableInput>
				<div :class="$style['errors']">
					<span v-show="nameError">{{ nameError }}</span>
					<span v-show="surnameError">{{ surnameError }}</span>
				</div>
				<button :class="$style['btn']" @click="onUserCreated">Создать пользователя</button>
			</template>
			<template v-else>
				<p>
					Пользователь {{ newUser.name }} {{ newUser.surname }} успешно создан
				</p>
				<p>Логин: {{ newUser.login }}</p>
				<p>Пароль: {{ newUser.login }}</p>
			</template>
		</div>
	</TheModal>
</template>

<style module lang="scss">
@use "sass:color";
.add-user-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	padding: 12px;
}
.errors {
	color: #d40000;
	font-family: Raleway;
	font-size: 15px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	letter-spacing: 0.3px;
	display: flex;
	flex-direction: column;
}
.btn {
	width: 450px;
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
</style>
