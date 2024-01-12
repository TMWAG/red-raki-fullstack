import { UITheButton } from '#build/components';
<script setup lang="ts">
import { ICreateUserResponse } from "~/@types";

const { $backendUrl } = useNuxtApp();

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
}

function onModalClose() {
	name.value = "";
	nameError.value = "";
	surname.value = "";
	surnameError.value = "";
	emit("canceled");
}
const createButtonDisabled = computed(() => {
	return Boolean(
		nameError.value || surnameError.value || !name.value || !surname.value
	);
});
</script>

<template>
	<TheModal header="Добавление пользователя" @close="onModalClose">
		<UIFormWrapper v-if="!newUser">
			<UITextInput
				placeholder="Рамиль"
				label="Имя нового пользователя"
				v-model="name"
				@input="validateName"
				@focus="validateName"
			/>
			<UITextInput
				placeholder="Марданов"
				label="Фамилия нового пользователя"
				v-model="surname"
				@input="validateSurname"
				@focus.self="validateSurname"
			/>
			<UITheSelect
				label="Роль нового пользователя"
				:list="[
					{ id: 'ADMIN', name: 'Администратор' },
					{ id: 'SUPERVISOR', name: 'Супервайзер' },
				]"
				:selected="roleName"
				@selected="onRoleChange"
			/>
			<UIErrorList :errors-list="[nameError, surnameError]" />
			<UITheButton
				@click.prevent="onUserCreated"
				:disabled="createButtonDisabled"
				>Добавить пользователя</UITheButton
			>
		</UIFormWrapper>
		<template v-else>
			<p>
				Пользователь {{ newUser.name }} {{ newUser.surname }} успешно создан
			</p>
			<p>Логин: {{ newUser.login }}</p>
			<p>Пароль: {{ newUser.login }}</p>
		</template>
	</TheModal>
</template>
