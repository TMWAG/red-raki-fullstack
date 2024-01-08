<script setup lang="ts">
withDefaults(
	defineProps<{
		disabled?: boolean;
		size?: "sm" | "md" | "lg";
	}>(),
	{
		disabled: false,
	}
);
</script>

<template>
	<button
		class="btn"
		:class="{ sm: size === 'sm', md: size === 'md', lg: size === 'lg' }"
		:disabled="disabled"
	>
		<slot />
	</button>
</template>

<style scoped lang="scss">
@use "sass:color";
.btn {
	width: 100%;
	align-self: center;
	padding: 15px 30px;
	border-radius: 8px;
	background-color: #591c21;
	color: #fbfbfb;
	border: none;
	outline: none;
	font-family: "Raleway";
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	transition: all ease 0.2s;
	&:hover {
		background-color: color.adjust($color: #591c21, $lightness: 5%);
	}
	&:focus {
		outline: solid 1px #591c21;
		outline-offset: 1px;
	}
	&:disabled {
		background-color: #7b6063;
		color: #fbfbfb80;
		cursor: not-allowed;
	}
}
.sm {
	width: 33%;
}
.md {
	width: 50%;
}
.lg {
	width: 66%;
}
</style>
