<template>
  <form :class="$style['form-wrapper']">
    <slot/>
  </form>
</template>

<style module lang="scss">
.form-wrapper {
	display: flex;
	align-items: stretch;
	flex-direction: column;
	gap: 9px 0;
	padding: 19px 19px 18px;
}
</style>
