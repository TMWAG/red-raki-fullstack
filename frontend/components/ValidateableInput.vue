<script setup lang="ts">
defineProps<{
	label: string;
}>();
const val = ref<string>("");
const id = `input-${String(Math.floor(Math.random() * 1000))}`;
</script>

<template>
	<div class="labeled-input">
		<label :for="id" class="labeled-input__label">
			{{ label }}
		</label>
		<slot :id="id">
			<input
				:id="id"
				class="labeled-input__input"
				type="text"
				v-model="val"
				placeholder="placeholder"
			/>
		</slot>
	</div>
</template>

<style lang="scss">
.labeled-input {
	display: flex;
	flex-direction: column;
	position: relative;
	margin-bottom: 11px;
	&:last-child {
		margin-bottom: 0;
	}
	&__label {
		color: #591c21;
		font-family: "Raleway";
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 0.28px;
		padding-bottom: 8px;
	}
	&__input {
		width: 374px;
		height: 38px;
		border-radius: 8px;
		border: 1px solid #c0979b;
		background-color: #fbfbfb;
    color: #121212;
    padding: 8px 13px;
		transition: border-color ease 0.2s;
		font-family: 'Sans Serif';
		&:focus {
      border-color: #591c21;
      outline: none;
		}
		&::placeholder {
			color: rgba(148, 148, 148, 0.5);
			font-family: Open Sans;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}
	&__switch {
		position: absolute;
		top: 41%;
		right: 3.5%;
		width: 24px;
		height: 38px;
		background-color: transparent;
		border: none;
		outline: none;
		cursor: pointer;
	}
}
</style>
