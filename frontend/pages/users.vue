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
		<div>
			<div v-for="u in data?.users" :key="u.id">
				<p>{{ u.login }}</p>
				<p>Имя: {{ u.name }}</p>
				<p>Фамилия: {{ u.surname }}</p>
			</div>
		</div>
		<AddUserModal
			v-if="isAddModalVisible"
			@canceled="hideAddModal"
			@created="updateUsers"
		/>
	</div>
</template>

<style lang="scss"></style>
