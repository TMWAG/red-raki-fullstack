<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    modelValue: string;
  }>(), {
    label: "Число",
    placeholder: "1234",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
<UIInputWrapper :label="label" v-slot="s">
  <input
    :id="s.id"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue"
    v-maska
    data-maska="0.99"
    data-maska-tokens="0:\d:multiple|9:\d:optional"
  />
</UIInputWrapper>
</template>
