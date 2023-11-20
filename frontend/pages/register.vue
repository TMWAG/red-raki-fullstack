<script setup lang="ts">
useHead({
	title: 'Регистрация'
})
</script>

<template>
  <div class="auth">
    <RegisterForm />
  </div>
</template>

<style lang="scss" scoped>
.auth {
	padding-top: 55px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
