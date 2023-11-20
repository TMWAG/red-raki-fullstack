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
  padding-top: 55px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>