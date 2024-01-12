<script setup lang="ts">
import { IUserListResponse } from "~/@types";

const { $backendUrl } = useNuxtApp();

if (useCookie("role").value !== "ADMIN") {
	await navigateTo("/");
}

const { data, refresh } = useFetch<IUserListResponse>(
	`${$backendUrl()}/api/user/all`,
	{
		headers: { Authorization: `Bearer ${useCookie("token").value}` },
		key: "users",
	}
);
function updateUsers() {
	refresh({ dedupe: true });
}

const isAddModalVisible = ref<boolean>(false);
function showAddModal() {
	isAddModalVisible.value = true;
}
function hideAddModal() {
	isAddModalVisible.value = false;
}

const isChangePasswordModalVisible = ref<boolean>(false);
const passwordChangeSuccess = ref<boolean>(false);
function showChangePasswordModal() {
	isChangePasswordModalVisible.value = true;
}
function hideChangePasswordModal() {
	isChangePasswordModalVisible.value = false;
}
function changePassword(oldPassword: string, newPassword: string) {
	$fetch(`${$backendUrl()}/api/user/change_password`, {
		method: "PATCH",
		body: JSON.stringify({
			oldPassword,
			newPassword,
		}),
		headers: {
			Authorization: `Bearer ${useCookie("token").value}`,
		},
	})
	.then(() => passwordChangeSuccess.value = true)
	.catch((e) => {
		console.log(e);
	});
}
onMounted(() => {
	if (useCookie("role").value !== "ADMIN") {
		return navigateTo("/");
	}
});

onUpdated(() => {
	if (useCookie("role").value !== "ADMIN") {
		return navigateTo("/");
	}
});
useHead({
	title: "Пользователи",
});
</script>

<template>
	<div>
		<h2>Пользователи</h2>
		<button @click="showAddModal">Добавить нового пользователя</button>
		<button @click="showChangePasswordModal">Изменить пароль</button>
		<div :class="$style.user_card_list">
			<UIUserCard v-for="u in data?.users" :user="u" />
		</div>
		<div :class="$style.self_control"></div>
		<ChangePasswordForm
			v-show="isChangePasswordModalVisible"
			:success="passwordChangeSuccess"
			@canceled="hideChangePasswordModal"
			@change-attempt="changePassword"
		/>
		<LazyFormUserAdd
			v-if="isAddModalVisible"
			@canceled="hideAddModal"
			@created="updateUsers"
		/>
	</div>
</template>

<style lang="scss" module>
.user_card_list {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 12px;
}
.self_control {
	background-color: red;
}
</style>
