<script setup lang="ts">
import { ICategory } from "~/@types";

defineProps<{
	category: ICategory;
	editButtonsVisibility: boolean;
}>();
const emit = defineEmits<{
	(e: "edit"): void;
	(e: "delete"): void;
}>();
</script>

<template>
	<div
		class="chip"
		:class="$route.params.categoryId === category.id ? 'chip_active' : ''"
	>
		<button
			v-if="editButtonsVisibility"
			class="chip__controls"
			@click="emit('edit')"
		>
			<svg
				width="19"
				height="19"
				viewBox="0 0 19 19"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M8.70833 3.95834H3.78241C3.40914 3.95834 3.05116 4.10662 2.78722 4.37056C2.52328 4.6345 2.375 4.99248 2.375 5.36575V15.2176C2.375 15.5909 2.52328 15.9488 2.78722 16.2128C3.05116 16.4767 3.40914 16.625 3.78241 16.625H13.6343C14.0075 16.625 14.3655 16.4767 14.6294 16.2128C14.8934 15.9488 15.0417 15.5909 15.0417 15.2176V10.2917"
					stroke="#FBFBFB"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M13.9858 2.82782C14.2757 2.53788 14.669 2.375 15.079 2.375C15.489 2.375 15.8823 2.53788 16.1722 2.82782C16.4622 3.11776 16.625 3.51099 16.625 3.92103C16.625 4.33106 16.4622 4.72429 16.1722 5.01423L9.24859 11.9379L6.33337 12.6667L7.06218 9.75145L13.9858 2.82782Z"
					stroke="#FBFBFB"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<NuxtLink :to="`/catalogue?categoryId=${category.id}`" class="chip__link">
			{{ category.name }}
		</NuxtLink>
		<button
			v-if="editButtonsVisibility"
			class="chip__controls"
			@click="emit('delete')"
		>
			<svg
				width="19"
				height="19"
				viewBox="0 0 19 19"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6.78576 5.54167V3.8C6.78576 3.42207 6.92874 3.05961 7.18325 2.79237C7.43777 2.52513 7.78296 2.375 8.1429 2.375H10.8572C11.2171 2.375 11.5623 2.52513 11.8168 2.79237C12.0713 3.05961 12.2143 3.42207 12.2143 3.8V5.54167M15.0417 5.54167L14.25 15.2C14.25 15.5779 14.1071 15.9404 13.8525 16.2076C13.598 16.4749 13.2528 16.625 12.8929 16.625H6.10718C5.74725 16.625 5.40205 16.4749 5.14754 16.2076C4.89302 15.9404 4.75004 15.5779 4.75004 15.2L3.95837 5.54167H15.0417Z"
					stroke="#FBFBFB"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M3.16663 5.54166H4.57403H15.8333"
					stroke="#FBFBFB"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M7.91663 8.70834V12.6667"
					stroke="#FBFBFB"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M11.0834 8.70834V12.6667"
					stroke="#FBFBFB"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
</template>

<style lang="scss">
.chip {
	background-image: linear-gradient(
		to right,
		#591C21,
		#591C21 50%,
		#911D28 50%,
	);
	display: flex;
	align-content: center;
	padding: 0 11px;
	gap: 0 0.5rem;
	background-size: 200% 100%;
	background-position: -100%;
	border-radius: 20px;
	cursor: pointer;
	transition: all ease 0.3s;
	text-decoration: none;
	&:hover {
		background-position: 0;
	}
	&_active {
		background-position: 0;
	}
	&__link {
		-webkit-text-fill-color: #fbfbfb;
		border: none;
		outline: none;
		padding: 10px 20px;
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		font-family: "Raleway";
		font-size: 18px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		text-transform: uppercase;
		text-transform: capitalize;
		&::before {
			display: none;
		}
	}
	&__controls {
		outline: none;
		border: none;
		background-color: transparent;
	}
}
.chip_active {
	background-color: #591C21;
}
</style>
