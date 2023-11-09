<script setup lang="ts">
useHead({
  title: 'Авторизация',
})
</script>

<template>
  <div class="auth">
    <LoginForm/>
  </div>
</template>

<style lang="scss" scoped>
@use '/assets/colors';
.auth {
  margin: 2rem auto;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>