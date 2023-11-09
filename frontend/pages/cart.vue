<script setup lang="ts">
useHead({
	title: 'Корзина',
})
const cartStore = useCartStore();
</script>

<template>
	<div class="cart_wrapper">
		<div v-if="cartStore.productList.length" class="order_info">
			<OrderedProductCard
				v-for="op, index in cartStore.productList"
				:ordered-product="op"
				:number="index+1"
			/>
			<ConfirmOrderForm/>
		</div>
		<div v-else>
			<p>Товары, добавленные в корзину будут отображаться здесь, чтобы оформить заказ добавьте хотя бы один товар из <NuxtLink to="/catalogue">каталога</NuxtLink> в корзину</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.cart_wrapper {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
.order_info {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
