<script setup lang="ts">
defineProps<{
	label: string;
}>();

const id = `input-id-${Math.floor(Math.random() * 1000)}`;
</script>

<template>
	<div :class="$style.wrapper">
		<label :for="id" :class="$style.label">{{ label }}</label>
		<slot :id="id" />
	</div>
</template>

<style module lang="scss">
@use "sass:color";
.wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	position: relative;
	gap: 4px;
	> input {
		align-self: stretch;
		background-color: #fbfbfb;
		border-radius: 8px;
		border: 1px solid #c0979b;
		color: #121212;
		font-family: "Open Sans";
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		height: 44px;
		line-height: normal;
		padding: 8px 13px;
		resize: none;
		transition: border-color ease 0.2s;
		&:focus {
			border-color: #591c21;
			outline: 1px solid;
		}
		&::placeholder {
			color: rgba(148, 148, 148, 0.5);
			font-family: "Open Sans";
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
		&:disabled {
			color: color.adjust($color: #121212, $lightness: 35%);
			cursor: not-allowed;
		}
	}
}
.label {
	color: #591c21;
	font-family: "Raleway";
	font-size: 15px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: 0.3px;
	align-self: flex-start;
	padding-left: 7px;
}
</style>
