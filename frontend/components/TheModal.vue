<script setup lang="ts">
defineProps<{
	header: string;
}>();
const emit = defineEmits<{
	(e: "close"): void;
}>();
</script>

<template>
	<div class="modal" @click.self="emit('close')">
		<Transition>
			<div class="modal__tab">
				<div class="modal__header">
					<p class="modal__text">{{ header }}</p>
					<svg
						class="modal__close"
						@click="emit('close')"
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1 1L11 11M1 11L11 1"
							stroke="#FBFBFB"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div class="modal__form-wrapper">
					<slot />
				</div>
			</div>
		</Transition>
	</div>
</template>

<style lang="scss">
@use "sass:color";
.modal {
	align-items: center;
	backdrop-filter: blur(4px);
	background: rgba(18, 18, 18, 0.4);
	bottom: 0;
	display: flex;
	flex-direction: column;
	height: 93.4%;
	justify-content: center;
	left: 0;
	position: fixed;
	width: 100%;
	z-index: 2;
	&__tab {
		border-radius: 20px;
		background-color: #ebe3e1;
		width: 488px;
	}
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20px 20px 0px 0px;
		background-color: #911d28;
		min-height: 42px;
		padding: 0 17px;
	}
	&__text {
		color: #fbfbfb;
		font-family: "Raleway";
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	&__close {
		cursor: pointer;
	}
	&__form-wrapper {
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: 9px;
		padding: 19px 19px 18px;
	}
}
</style>
