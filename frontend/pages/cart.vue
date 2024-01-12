<script setup lang="ts">
import { Mask } from 'maska';

const mask = new Mask({ mask: "+7 (###) ### - ## - ##" });

const cartStore = useCartStore();
const notificationStore = useNotificationStore();

async function confirmOrder(phone: string, address: string) {
	const req = await $fetch(`${useRuntimeConfig().public.apiUrl}/api/order`, {
		method: "POST",
		body: {
			address,
			phone: mask.unmasked(phone),
			orderedProducts: cartStore.productList.map((op) => {
				return {
					amount: op.amount,
					productId: op.product.id,
				}
			}),
		},
	});
	
}

useHead({
	title: 'Корзина',
})
</script>

<template>
	<div class="cart">
		<div class="cart__goods">
			<div v-if="cartStore.productList.length" class="order-info">
				<OrderedProductCard
				v-for="op, index in cartStore.productList"
				:ordered-product="op"
				:number="index+1"
				/>
			</div>
			<div v-else>
				<p>Товары, добавленные в корзину будут отображаться здесь, чтобы оформить заказ добавьте хотя бы один товар из <UITheLink to="/catalogue">каталога</UITheLink> в корзину</p>
			</div>
		</div>
		<div class="cart__total-confirm">
			<ConfirmOrderForm @confirmed="confirmOrder"/>
		</div>
	</div>
</template>

<style lang="scss">
.cart {
	padding-top: 20px;
	display: grid;
	grid-template-areas: "g tc";
	gap: 20px;
	&__goods {
		grid-area: g;
	}
	&__total-confirm {
		grid-area: tc;
	}
}
.order-info {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
