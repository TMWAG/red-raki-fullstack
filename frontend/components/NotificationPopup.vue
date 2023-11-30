<script setup lang="ts">
const store = useNotificationStore();
</script>

<template>
	<div class="notification-list">
		<TransitionGroup>
			<div
				v-for="n in store.notificationList"
				class="notification-list__notification"
				:class="n.type"
				:key="n.id"
			>
				<p class="notification-list__notification-header">
					{{ n.header }}
					<CloseButton @close="store.dismissNotification(n.id)" />
				</p>
				<p class="notification-list__notification-message">{{ n.message }}</p>
			</div>
		</TransitionGroup>
	</div>
</template>

<style lang="scss">
.notification-list {
	display: flex;
	flex-direction: column;
	flex-flow: column-reverse;
	gap: 0.25rem;
	width: 360px;
	position: fixed;
	bottom: 12px;
	right: 12px;
	z-index: 999;
	&__notification {
		border-radius: 20px;
		background-color: aliceblue;
		&-header{
			padding: 8px;
			border-radius: 20px 20px 0 0;
			color: #FBFBFB;
			background-color: #911D28;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&-message {
				padding: 8px;
			border-radius: 0 0 20px 20px;
		}
	}
}
.error {
	border-color: red;
	color: red;
}

.info {
	border-color: blue;
	color: blue;
}

.warning {
	border-color: orange;
	color: orange;
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
