<script setup lang="ts">
import { storeToRefs } from "pinia";
import { IProduct } from "~/@types";

defineProps<{
	product: IProduct;
}>();

const emit = defineEmits<{
	(e: "edit-product", product: IProduct): void;
	(e: "delete-product", product: IProduct): void;
}>();

const cartStore = useCartStore();

const url = useRuntimeConfig().public.apiUrl;
const role = useCookie("role");
const editButtonsVisibility = computed(() => {
	return role.value === "ADMIN" || role.value === "SUPERVISOR";
});
</script>

<template>
	<div class="product_card">
		<img
			class="product_picture"
			:src="`${url}/static/products/${product.image}`"
			:alt="product.name"
		/>
		<span class="product_name">{{ product.name }}</span>
		<span class="product_description">{{ product.description }}</span>
		<span class="product_price"
			>Цена:
			<span>{{
				product.price.toLocaleString("ru-RU", {
					style: "currency",
					currency: "RUB",
				})
			}}</span></span
		>
		<button
			v-if="cartStore.isInCart(product.id) === undefined"
			@click="cartStore.addProduct(product)"
			class="add_button"
		>
			Добавить в корзину
		</button>
		<div v-else class="cart_control_group">
			<button @click="cartStore.removeProduct(product.id)">-</button>
			<span class="cart_amount">{{ cartStore.isInCart(product.id) }}</span>
			<button @click="cartStore.addProduct(product)">+</button>
		</div>
		<div v-if="editButtonsVisibility">
			<EditButton
				@edit="emit('edit-product', product)"
				width="24px"
				height="24px"
			/>
			<DeleteButton
				@delete="emit('delete-product', product)"
				width="24px"
				height="24px"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use "/assets/colors";
.product_card {
	display: grid;
	grid-template-rows: 4fr 1fr 1fr 1fr;
	justify-content: center;
	text-align: center;
	border: 2px solid colors.$accent;
	border-radius: 3px;
	background-color: colors.$white;
	padding: 1rem;
	.product {
		&_picture {
			width: 200px;
			justify-self: center;
			align-self: center;
		}
		&_name {
			color: colors.$accent;
			font-size: 1.5rem;
			font-weight: 500;
		}
		&_description {
			text-align: center;
		}
		&_price {
			span {
				font-size: 1.25rem;
				color: colors.$primary;
			}
		}
	}
}
.add_button {
	border: 2px solid colors.$accent;
	border-radius: 3px;
	background-color: colors.$white;
	font-size: 1rem;
	transition: scale ease-in-out 0.2s;
	padding: 0.25rem;
	&:hover {
		scale: 105%;
	}
}
.cart {
	&_control_group {
		display: grid;
		align-items: stretch;
		grid-template-columns: repeat(3, 1fr);
		border: 2px solid colors.$accent;
		border-radius: 3px;
		button {
			font-size: 1.5rem;
			background-color: transparent;
			border-radius: 3px;
			border: none;
			transition: scale ease-in-out 0.1s;
			&:hover {
				scale: 110%;
			}
		}
		span {
			font-size: 1.5rem;
			border: 2px solid colors.$accent;
			border-top: none;
			border-bottom: none;
		}
	}
}
</style>
