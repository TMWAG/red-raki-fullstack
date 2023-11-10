<script setup lang="ts"></script>

<template>
	<button class="btn">
		<slot>
			<span>Push Me!</span>
		</slot>
	</button>
</template>

<style lang="scss">
@use "sass:color";
.btn {
	outline: none;
	border: none;
	border-radius: 5px;
	padding: 0.5rem 1rem;
	background-color: $accent;
	color: $white;
	transition: background-color,scale ease 0.1s;
	&:hover {
		background-color: color.adjust($color: $accent, $lightness: 5%);
		transform: scale(105%);
	}
	&:focus {
		outline: 1px solid color.adjust($color: $accent, $lightness: 5%);
		outline-offset: 1px;
	}
	&:active {
		background-color: color.adjust($color: $accent, $blackness: 5%);
	}
	&:disabled {
		color: black;
		background-color: color.adjust($color: $accent, $alpha: -0.5);
	}
	&_error {
		color: $warn;
		transition: all ease 0.1s;
		&:hover {
			background-color: color.adjust($color: $warn, $lightness: 5%);
			color: $accent;
		}
		&:focus {
			outline: 1px dashed color.adjust($color: $warn, $lightness: 5%);
		}
		&:active {
			background-color: color.adjust($color: $warn, $blackness: 5%);
		}
	}
}
</style>
