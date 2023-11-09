<script setup lang="ts">
import { InputHTMLAttributes } from 'vue';
defineProps<{
  label: string;
  type: InputHTMLAttributes['type'];
  placeholder?: string;
  value: string | File | undefined;
  pattern?: string;
  error: string | undefined;
}>();
</script>

<template>
<label class="input">
  {{ label }}
  <input
    :type="type"
    :placeholder="placeholder"
    :pattern="pattern"
    :value="value"
  />
  <span class="error">{{ error }}</span>
</label>
</template>

<style lang="scss" scoped>
@use '/assets/colors';
@use 'sass:color';
.input {
  font-size: 1rem;
  width: min-content;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: flex-start;
  & input {
    font-size: 1.25rem;
    height: 3rem;
    width: 20rem;
    padding: .25rem;
    margin: .25rem;
    border-radius: 3px;
    border: 2px solid colors.$accent;
    transition: border-color, scale ease-in-out 0.3s;
    &:focus {
      border-color: colors.$primary;
      outline: none;
      transition: border-color, scale ease-in-out 0.3s;
      scale: 105%;
    }
    &::placeholder {
      font-size: 1.25rem;
      color: colors.$accent;
      opacity: .75;
    }
    &:invalid {
      background-color: color.adjust($color: colors.$warn, $alpha: -0.8);
    }
  }
  .error {
    color: colors.$warn;
    text-align: center;
    font-size: .9rem;
  }
}
</style>