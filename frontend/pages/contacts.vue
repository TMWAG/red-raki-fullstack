<script setup lang="ts">
useHead({
	title: "Контакты",
});
</script>

<template>
	<div :class="$style.maps">
		<div :class="$style.map" style="position: relative; overflow: hidden">
			<p>Мытищи</p>
			<UITheLink href="tel:+79265403444" style="font-family: 'Open Sans'">
				8-926-540-34-44
			</UITheLink>
			<iframe
				src="https://yandex.ru/map-widget/v1/?ll=37.720367%2C55.925042&mode=search&oid=1680628610&ol=biz&z=17"
				width="560"
				height="400"
				frameborder="1"
				allowfullscreen="true"
				style="position: relative"
			></iframe>
		</div>
		<div :class="$style.map" style="position: relative; overflow: hidden">
			<p>Химки</p>
			<UITheLink href="tel:+79266033444" style="font-family: 'Open Sans'">
				8-926-603-34-44
			</UITheLink>
			<iframe
				src="https://yandex.ru/map-widget/v1/?ll=37.412239%2C55.890543&mode=search&oid=55156576995&ol=biz&z=18"
				width="560"
				height="400"
				frameborder="1"
				allowfullscreen="true"
				style="position: relative"
			></iframe>
		</div>
		<div :class="$style.map" style="position: relative; overflow: hidden">
			<p>Королёв</p>
			<UITheLink href="tel:+79262703444" style="font-family: 'Open Sans'">
				8-926-270-34-44
			</UITheLink>
			<iframe
				src="https://yandex.ru/map-widget/v1/?ll=37.829691%2C55.912446&mode=search&oid=227810088568&ol=biz&z=17"
				width="560"
				height="400"
				frameborder="1"
				allowfullscreen="true"
				style="position: relative"
			></iframe>
		</div>
		<div :class="$style.map" style="position: relative; overflow: hidden">
			<p>Москва</p>
			<UITheLink href="tel:+79258383444" style="font-family: 'Open Sans'">
				8-925-838-34-44
			</UITheLink>
			<iframe
				src="https://yandex.ru/map-widget/v1/?ll=37.503954%2C55.563361&mode=poi&poi%5Bpoint%5D=37.503793%2C55.563524&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D151950003611&z=18"
				width="560"
				height="400"
				frameborder="1"
				allowfullscreen="true"
				style="position: relative"
			></iframe>
		</div>
	</div>
</template>

<style lang="scss" module>
.maps {
	display: grid;
	grid-template-columns: repeat(2, 2fr);
	gap: 24px;
	margin: 24px 0;
}
.map {
	background-color: #ebe3e1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 18px;
	gap: 12px;
	border-radius: 24px;
	> p {
		font-size: 18px;
		color: #911d28;
		font-weight: 700;
	}
	> iframe {
		border: none;
	}
}
</style>
