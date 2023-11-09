<script setup lang="ts">
import { IOrderedProduct } from "~/@types";

const props = defineProps<{
	orderedProduct: IOrderedProduct;
	number: number;
}>();

const url = useRuntimeConfig().public.apiUrl;

const { addProduct, removeProduct, deleteProduct } = useCartStore();

const totalPrice = computed(() =>
	(
		props.orderedProduct.amount * props.orderedProduct.product.price
	).toLocaleString("ru-RU", {
		style: "currency",
		currency: "RUB",
	})
);
</script>

<template>
	<div class="ordered_product_card">
		<div class="product_info">
			<span class="product_number">
				{{ number }}
			</span>
			<img
				:src="`${url}/static/products/${orderedProduct.product.image}`"
				:alt="orderedProduct.product.name"
				class="product_image"
			/>
			<span class="product_name">
				{{ orderedProduct.product.name }}
			</span>
			<DeleteButton
				height="24px"
				width="24xp"
				@click="deleteProduct(orderedProduct.product.id)"
			/>
			<div class="amount_control">
				<button @click="removeProduct(orderedProduct.product.id)">-</button>
				<span>{{ orderedProduct.amount }}</span>
				<button @click="addProduct(orderedProduct.product)">+</button>
			</div>
		</div>
		<span class="product_price">{{ totalPrice }}</span>
	</div>
</template>

<style lang="scss" scoped>
@use "/assets/colors";
.ordered_product_card {
	display: grid;
	grid-template-columns: 10fr 2fr;
	align-items: stretch;
	border: 2px solid colors.$accent;
	border-radius: 5px;
	padding: 1rem;
	.product_info {
		display: grid;
		grid-template-columns: 0.25fr 1fr 3fr 1fr 1fr;
		align-items: center;
		span {
			display: block;
		}
		.product_number {
			font-size: 1.5rem;
		}
		.product_image {
			height: 50px;
			justify-self: center;
		}
		.product_name {
			font-size: 2rem;
		}
		.amount_control {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			border: 2px solid colors.$accent;
			border-radius: 3px;
			button {
				font-size: 1.5rem;
				background-color: transparent;
				border-radius: 3px;
				border: none;
				transition: background-color ease-in-out 0.1s;
				&:hover {
					background-color: colors.$white;
				}
			}
			span {
				font-size: 1.5rem;
				border: 2px solid colors.$accent;
				border-top: none;
				border-bottom: none;
				text-align: center;
			}
		}
	}
	.product_price{
		font-size: 1.5rem;
		justify-self: center;
	}
}
</style>
