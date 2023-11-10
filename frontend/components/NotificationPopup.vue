<script setup lang="ts">
const store = useNotificationStore();
</script>

<template>
	<div class="wrapper">
		<TransitionGroup>
			<div
				v-for="n in store.notificationList"
				class="popup"
				:class="n.type"
				:key="n.id"
			>
				<p class="header" :class="n.type">
					{{ n.header }}
					<CloseButton @close="store.dismissNotification(n.id)" />
				</p>
				<p class="message">{{ n.message }}</p>
			</div>
		</TransitionGroup>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	flex-flow: column-reverse;
	gap: 0.25rem;
	width: 20rem;
	position: fixed;
	bottom: 0.25rem;
	right: 0.25rem;
	z-index: 999;
}
.popup {
	width: 20rem;
	height: fit-content;
	border: 2px solid;
	border-radius: 5px;
	background-color: $white;
	& .header {
		padding: 0.25rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.125rem;
		span {
			transform-origin: -40% 35%;
			transform: rotate(-45deg);
			font-size: 2rem;
			cursor: pointer;
		}
	}
	& .message {
		padding: 0.25rem;
	}
}
.error {
	border-color: $warn;
	color: $warn;
}

.info {
	border-color: $accent;
	color: $accent;
}

.warning {
	border-color: $secondary;
	color: $secondary;
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
