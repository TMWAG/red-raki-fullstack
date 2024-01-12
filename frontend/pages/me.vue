<script setup lang="ts">
const { $backendUrl } = useNuxtApp();
const { data } = await useFetch(`${$backendUrl()}/api/order/my`, {
	method: "get",
	key: "myOrders",
	headers: {
		Authorization: `Bearer ${useCookie("token").value}`,
	},
});



useHead({
	title: "Личный кабинет",
});
</script>

<template>
	<div>
		<NuxtLayout name="profile-layout">
			<pre>{{ data }}</pre>
		</NuxtLayout>
	</div>
</template>

<style lang="scss"></style>
