<script setup lang="ts">
import { IProduct } from "~/@types";

defineProps<{
	product: IProduct;
}>();

const emit = defineEmits<{
	(e: "edit"): void;
	(e: "delete"): void;
	(e: "add-to-cart"): void;
}>();

const url = useRuntimeConfig().public.apiUrl;

const role = useCookie("role");
const editButtonsVisibility = computed(() => {
	return role.value === "ADMIN" || role.value === "SUPERVISOR";
});
</script>

<template>
	<div class="product-card">
		<div v-if="editButtonsVisibility" class="product-card__admin-controls">
			<svg
				@click="emit('edit')"
				width="22"
				height="22"
				viewBox="0 0 22 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.0833 4.58334H4.37963C3.94742 4.58334 3.53292 4.75504 3.22731 5.06065C2.92169 5.36627 2.75 5.78077 2.75 6.21297V17.6204C2.75 18.0526 2.92169 18.4671 3.22731 18.7727C3.53292 19.0783 3.94742 19.25 4.37963 19.25H15.787C16.2192 19.25 16.6337 19.0783 16.9394 18.7727C17.245 18.4671 17.4167 18.0526 17.4167 17.6204V11.9167"
					stroke="#121212"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16.194 3.27432C16.5298 2.9386 16.9851 2.75 17.4599 2.75C17.9346 2.75 18.39 2.9386 18.7257 3.27432C19.0614 3.61003 19.25 4.06536 19.25 4.54013C19.25 5.01491 19.0614 5.47024 18.7257 5.80595L10.7088 13.8228L7.33333 14.6667L8.17721 11.2912L16.194 3.27432Z"
					stroke="#121212"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<svg
				@click="emit('delete')"
				width="22"
				height="22"
				viewBox="0 0 22 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7.85714 6.41667V4.4C7.85714 3.96239 8.0227 3.54271 8.3174 3.23327C8.6121 2.92384 9.0118 2.75 9.42857 2.75H12.5714C12.9882 2.75 13.3879 2.92384 13.6826 3.23327C13.9773 3.54271 14.1429 3.96239 14.1429 4.4V6.41667M17.4167 6.41667L16.5 17.6C16.5 18.0376 16.3344 18.4573 16.0397 18.7667C15.745 19.0762 15.3453 19.25 14.9286 19.25H7.07142C6.65465 19.25 6.25496 19.0762 5.96026 18.7667C5.66556 18.4573 5.49999 18.0376 5.49999 17.6L4.58333 6.41667H17.4167Z"
					stroke="#121212"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M3.66667 6.41666H5.2963H18.3333"
					stroke="#121212"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M9.16667 10.0833V14.6667"
					stroke="#121212"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12.8333 10.0833V14.6667"
					stroke="#121212"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<img
			class="product-card__img"
			:src="`${url}/static/products/${product.image}`"
			:alt="product.name"
		/>
		<div class="product-card__name-description-notes">
			<span class="product-card__name">{{ product.name }}</span>
			<span class="product-card__description"> {{ product.description }} </span>
			<div class="product-card__notes">
				<span
					class="product-card__note"
					v-for="n in product.notes.split(';')"
					>{{ n }}</span
				>
			</div>
		</div>
		<div class="product-card__price-cart-btn">
			<span class="product-card__price"
				>{{
					product.price.toLocaleString("ru-RU", {
						style: "currency",
						currency: "RUB",
					})
				}}
			</span>
			<button class="product-card__cart-btn" @click="emit('add-to-cart')">
				В корзину
			</button>
		</div>
	</div>
</template>

<style lang="scss">
@use 'sass:color';
.product-card {
	position: relative;
	padding: 19px 19px 16px 19px;
	height: 480px;
	border-radius: 24px;
	box-shadow: 2px 6px 16px 0px rgba(0, 0, 0, 0.2);
	overflow: hidden;
	background-color: #fbfbfb;
	&__admin-controls {
		position: absolute;
		right: 19px;
		top: 16px;
		display: flex;
		gap: 12px;
		background: transparent;
	}
	&__img {
		display: block;
		height: 317px;
		width: 100%;
		object-fit: cover;
		border-radius: 8px;
	}
	&__name-description-notes {
		padding-top: 15px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	&__name {
		display: block;
		color: #911d28;
		font-weight: 700;
		font-size: 20px;
	}
	&__description {
		display: block;
		font-size: 14px;
		font-weight: 600;
		color: #121212;
		font-family: "Open Sans";
		padding-bottom: 3px;
	}
	&__notes {
		display: flex;
		flex-direction: column;
		padding-bottom: 4px;
	}
	&__note {
		font-family: "Open Sans";
		color: #a6a6a6;
		font-size: 12px;
		font-weight: 600;
	}
	&__price-cart-btn {
		display: flex;
		justify-content: space-between;
	}
	&__price {
		display: block;
		font-family: "Open Sans";
		font-size: 24px;
		color: #121212;
		font-weight: 700;
	}
	&__cart-btn {
		display: block;
		border-radius: 14px;
		border: none;
		outline: none;
		background-color: #911d28;
		color: #fbfbfb;
		height: 32px;
		width: 132px;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		transition: all ease .2s;
		&:hover {
			background-color: color.adjust($color: #911d28, $lightness: 5%)
		}
		&:active {
			scale: 101%;
		}
	}
}
</style>
