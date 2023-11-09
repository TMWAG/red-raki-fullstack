<script setup lang="ts">
defineProps<{
	header: string;
}>();
const emit = defineEmits<{
	(e: "close"): void;
}>();
</script>

<template>
	<div class="modal_background" @click.self="emit('close')">
		<Transition>
			<div class="modal">
				<div class="modal_header">
					<p>{{ header }}</p>
					<CloseButton @close="emit('close')" />
				</div>
				<slot />
			</div>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
@use "assets/colors";
@use "sass:color";
.modal_background {
	background-color: color.adjust(colors.$accent, $alpha: -0.5);
	position: absolute;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.modal {
		border: 2px solid colors.$accent;
		border-radius: 5px;
		background-color: colors.$white;
		.modal_header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid colors.$accent;
			p {
				font-size: 1.25rem;
				padding: 0.25rem;
			}
			span {
				display: block;
				font-size: 2rem;
				transform: rotate(45deg);
				transform-origin: 80% 40%;
			}
		}
	}
}
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
