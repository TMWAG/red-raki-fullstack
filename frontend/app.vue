<script setup lang="ts">
useHead({
  titleTemplate: '%s | Красный Рак'
})
</script>

<template>
  <NuxtLayout name="default">
    <NuxtPage/>
  </NuxtLayout>
</template>

<style lang="scss">
@import url('assets/index.scss');
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>