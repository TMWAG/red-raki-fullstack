<script setup lang="ts"></script>

<template>
	<NuxtLink class="link" active-class="link_active">
		<slot> link </slot>
	</NuxtLink>
</template>

<style lang="scss">
.link {
	text-decoration: none;
	font-family: "Raleway";
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	text-transform: uppercase;
	background-image: linear-gradient(
		to right,
		$secondary,
		$secondary 50%,
		$primary 50%
	);
	background-size: 200% 100%;
	background-position: -100%;
	display: inline-block;
	position: relative;
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	transition: all 0.3s ease-in-out;
	&:before {
		content: "";
		background: $primary;
		display: block;
		position: absolute;
		bottom: -3px;
		left: 0;
		width: 0;
		height: 3px;
		transition: all 0.3s ease-in-out;
	}
	&:hover {
		background-position: 0;
	}
	&:hover::before {
		width: 100%;
	}
	&:focus {
		background-position: 0;
	}
	&:focus::before {
		width: 100%;
	}
	&_active {
		background-position: 0;
		&::before {
			width: 100%;
		}
	}
}
</style>
