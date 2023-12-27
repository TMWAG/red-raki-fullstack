<script setup lang="ts">
defineProps<{
	errorsList: (string | undefined)[];
}>();
</script>

<template>
	<div :class="$style.list">
		<p
			v-for="e in errorsList"
			:key="`error-${e}`"
			:class="$style.item"
			v-show="e"
		>
			{{ e }}
		</p>
	</div>
</template>

<style module lang="scss">
.list {
	padding-left: 4px;
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	gap: 3px;
	align-items: flex-start;
}
.item {
	display: block;
	color: #d40000;
	font-family: "Raleway";
	font-size: 13px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.26px;
}
</style>
