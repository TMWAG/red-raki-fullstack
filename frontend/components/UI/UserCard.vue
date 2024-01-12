<script setup lang="ts">
import { ICreateUserResponse } from "~/@types";

const props = defineProps<{
	user: ICreateUserResponse;
}>();

const emit = defineEmits<{}>();
</script>

<template>
  <div :class="$style.user_card">
    {{ user.name }}
  </div>
</template>

<style module lang="scss">
.user_card{
  background-color: #fbfbfb;
  box-shadow: 2px 6px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-radius: 6px;
}
</style>
