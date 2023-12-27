<script setup lang="ts">
withDefaults(
	defineProps<{
		label?: string;
		placeholder?: string;
		modelValue: string;
		autocomplete: "current-password" | "new-password";
	}>(),
	{
		label: "Пароль",
		placeholder: "VaSh_PaRoL",
	}
);

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void;
}>();

const inputType = ref<"password" | "text">("password");

function togglePasswordVisibility() {
	if (inputType.value === "password") {
		inputType.value = "text";
	} else {
		inputType.value = "password";
	}
}

function updateValue(e: Event) {
	emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
	<UIInputWrapper :label="label" v-slot="s">
		<input
			:id="s.id"
			:type="inputType"
			:placeholder="placeholder"
			:value="modelValue"
			:autocomplete="autocomplete"
			@input="updateValue"
		/>
		<button :class="$style.switch" @click.prevent="togglePasswordVisibility">
			<svg
				v-show="inputType === 'text'"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4 4L20 20"
					stroke="#C8C8C8"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M10.8572 5.76588C11.2304 5.72237 11.6116 5.70001 12 5.70001C16.1976 5.70001 19.5599 8.31239 21 12C20.6449 12.9094 20.1728 13.7534 19.6002 14.5089M7.06766 7.0675C5.23159 8.18766 3.811 9.92334 3 12C4.44012 15.6876 7.80243 18.3 12 18.3C13.8338 18.3 15.5082 17.8014 16.9325 16.9324M10.0909 10.0907C9.60224 10.5794 9.3 11.2544 9.3 12C9.3 13.4912 10.5088 14.7 12 14.7C12.7456 14.7 13.4207 14.3978 13.9093 13.9091"
					stroke="#C8C8C8"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M4.79999 4.79999L19.2 19.2"
					stroke="#C8C8C8"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
			<svg
				v-show="inputType === 'password'"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g style="mix-blend-mode: multiply">
					<path
						d="M14.7 12C14.7 13.4911 13.4912 14.7 12 14.7C10.5088 14.7 9.3 13.4911 9.3 12C9.3 10.5088 10.5088 9.29995 12 9.29995C13.4912 9.29995 14.7 10.5088 14.7 12Z"
						stroke="#C8C8C8"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3 12C4.44012 8.31233 7.80243 5.69995 12 5.69995C16.1976 5.69995 19.5599 8.31233 21 12C19.5599 15.6876 16.1976 18.3 12 18.3C7.80243 18.3 4.44012 15.6876 3 12Z"
						stroke="#C8C8C8"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</g>
			</svg>
		</button>
	</UIInputWrapper>
</template>

<style module lang="scss">
@use "sass:color";
.switch {
	position: absolute;
	top: 42%;
	right: 3%;
	width: 24px;
	height: 38px;
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
}
</style>
