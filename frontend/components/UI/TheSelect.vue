<script setup lang="ts">
const props = defineProps<{
	list?: { id: string; name: string }[];
	selected: string;
}>();
const emit = defineEmits<{
	(e: "selected", id: string): void;
}>();
const open = ref<boolean>(false);
function select(id: string) {
	emit("selected", id);
	open.value = false;
}
</script>

<template>
	<div class="select" tabindex="0" @blur="open = false">
		<div
			class="select__list"
			:class="open ? 'select__list_open' : ''"
			@click="open = !open"
			@focus="open = true"
		>
			{{ selected }}
		</div>
		<div class="select__items" :class="!open ? 'select__items_hidden' : ''">
			<div
				v-for="(option, i) of list"
				class="select__item"
				:key="`select-list-item-${i}`"
				@click.self="select(option.id)"
			>
				{{ option.name }}
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.select {
	width: 450px;
	&__list {
		height: 44px;
		border-radius: 8px;
		border: solid 1px #911d28;
		background-color: #fbfbfb;
		display: flex;
		align-items: center;
		padding: 0 0 0 11px;
		color: #121212;
		font-family: "Open Sans";
		font-size: 18px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	&__items {
		display: block;
		animation: "show-select-options" 0.2s ease;
		animation-iteration-count: 1;
		background-color: #fbfbfb;
		box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.25); 
		border-radius: 4px;
		padding: 2px;
    width: 450px;
		&_hidden {
			display: none;
		}
	}
	&__item {
		padding: 2.5px;
		width: 446px;
		height: 26px;
		transition: all ease 0.2s;
		border-radius: 2px;
		color: #777777;
		cursor: pointer;
		&:hover {
			background-color: #911d28;
			color: #fbfbfb;
		}
	}
}
@keyframes show-select-options {
	0% {
		display: none;
	}
	1% {
		display: block;
		opacity: 0;
	}
	100% {
		display: block;
		opacity: 1;
	}
}
</style>
