<script setup lang="ts">
const token = useCookie('token');
const role = useCookie('role');
</script>

<template>
	<header class="header">
		<nav class="nav_bar">
			<div class="nav_main">
				<img src="logo_KR.png" alt="Красный рак" />
				<ul>
					<li>
						<NuxtLink activeClass="active" class="nav_link" to="/">
							Главная
						</NuxtLink>
					</li>
					<li>
						<NuxtLink activeClass="active" class="nav_link" to="/catalogue">
							Ассортимент
						</NuxtLink>
					</li>
					<li>
						<NuxtLink activeClass="active" class="nav_link" to="/contacts">
							Контакты
						</NuxtLink>
					</li>
				</ul>
			</div>
			<div class="nav_user">
				<ul>
					<li>
						<NuxtLink activeClass="active" class="nav_link" to="/cart">
							Корзина
						</NuxtLink>
					</li>
					<li>
						<NuxtLink
							v-if="token"
							activeClass="active"
							class="nav_link"
							to="/orders"
							>Заказы</NuxtLink
						>
						<NuxtLink v-else activeClass="active" class="nav_link" to="/login"
							>Войти</NuxtLink
						>
					</li>
					<li>
						<NuxtLink
							v-if="role === 'ADMIN' || role === 'SUPERVISOR'"
							activeClass="active"
							class="nav_link"
							to="admin"
							>Администрирование</NuxtLink
						>
					</li>
				</ul>
			</div>
		</nav>
	</header>
	<main class="main_wrapper">
		<slot />
	</main>
	<NotificationPopup />
</template>

<style lang="scss" scoped>
@use "/assets/colors";
.header {
	width: 100vw;
	display: flex;
	justify-content: center;
	background-color: colors.$white;
}
.nav_bar {
	width: inherit;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 70%;
}
.nav_main {
	display: flex;
	justify-content: space-around;
	width: 30rem;
	& ul {
		list-style: none;
		font-size: 1.25rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 20rem;
	}
	& img {
		height: 4rem;
	}
}
.nav_link {
	text-decoration: none;
	background-image: linear-gradient(
		to right,
		colors.$primary,
		colors.$primary 50%,
		colors.$warn 50%
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
		background: colors.$primary;
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
	&.active {
		background-position: 0;
		&::before {
			width: 100%;
		}
	}
}
.nav_user {
	width: 25rem;
	& ul {
		display: flex;
		list-style: none;
		justify-content: space-around;
		align-items: center;
		font-size: 1.25rem;
	}
}

.main_wrapper {
	width: 70%;
	margin: 2rem auto;
}
</style>
