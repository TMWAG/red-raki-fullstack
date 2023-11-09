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
	margin: 2rem auto;
	width: 60%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
