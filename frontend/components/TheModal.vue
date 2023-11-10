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
@use "sass:color";
.modal_background {
	background-color: color.adjust($accent, $alpha: -0.5);
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
		border: 2px solid $accent;
		border-radius: 5px;
		background-color: $white;
		.modal_header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid $accent;
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
