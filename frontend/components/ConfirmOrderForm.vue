<script setup lang="ts">
const phone = ref<string>(useCookie("phone").value || "");
const phoneError = ref<string>("");
const onPhoneChange = (e: Event) => {
	const { value } = e.target as HTMLInputElement;
	if (!/^((\+7|7|8)+([0-9]){10})$/.test(value)) {
		phoneError.value = "Телефон имеет неверный формат";
	} else {
		phoneError.value = "";
	}
	phone.value = value;
};

const address = ref<string>("");
const addressError = ref<string>("");
const onAddressChange = (e: Event) => {};
</script>

<template>
	<form class="confirm_order">
		<div>
			<ValidateableInput
				:error="phoneError"
				:value="phone"
				@input="onPhoneChange"
				label="Номер телефона"
				placeholder="89993332211"
				type="tel"
			/>
			<ValidateableInput
				:error="addressError"
				:value="address"
				@input="onAddressChange"
				label="Адрес"
				type="text"
				placeholder="Королёв, Терешковой, 12"
			/>
			<button class="button">Оформить заказ</button>
		</div>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse enim natus,
			cum incidunt odio quae autem sequi atque vero porro laudantium? Ducimus et
			adipisci temporibus ut alias quisquam optio odit.
		</p>
	</form>
</template>

<style lang="scss" scoped>
@use "/assets/colors";
.confirm_order {
	background-color: colors.$white;
	border: 2px solid colors.$accent;
	border-radius: 5px;
	padding: 1rem;
	display: grid;
	align-items: center;
	grid-template-columns: 4fr 8fr;
	.button {
		font-size: 1rem;
		height: 2rem;
		width: fit-content;
		padding: 0.25rem;
		border: 2px solid colors.$accent;
		border-radius: 3px;
		background-color: white;
		transition: border-color, scale ease-in-out 0.3s;
		margin: 0.25rem;
		&:hover {
			scale: 105%;
			border-color: colors.$primary;
			transition: border-color, scale ease-in-out 0.3s;
		}
		&:disabled {
			background-color: colors.$white;
			cursor: not-allowed;
		}
		&:disabled:hover {
			scale: 100%;
			border-color: colors.$accent;
		}
	}
}
</style>
