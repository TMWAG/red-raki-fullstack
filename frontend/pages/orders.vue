<script setup lang="ts">
import { IOrderResponse } from "~/@types";
const role = useCookie("role");
if (!role.value || role.value === "USER") {
	await navigateTo("/");
}

const { $backendUrl } = useNuxtApp();
const { data } = await useFetch<IOrderResponse[]>(
	`${$backendUrl()}/api/order/all`,
	{
		method: "GET",
		headers: {
			Authorization: `Bearer ${useCookie("token").value}`,
		},
		key: "order",
	}
);

const orderToView = ref<IOrderResponse>();
function onOrderSelected(o: IOrderResponse) {
  orderToView.value = o;
}
function onModalClose() {
  orderToView.value = undefined;
} 

useHead({
	title: "Новые заказы",
});
</script>

<template>
	<div>
		<ul>
			<li v-for="d in data">
				<button @click="onOrderSelected(d)">
					{{ d.address }} | {{ new Date(d.createdAt).toLocaleDateString() }} |
					{{ new Date(d.createdAt).toLocaleTimeString() }}
				</button>
			</li>
		</ul>
		<pre> {{ data }}</pre>
    <ViewOrderModal v-if="orderToView" :order="orderToView" @closed="onModalClose"/>
	</div>
</template>
