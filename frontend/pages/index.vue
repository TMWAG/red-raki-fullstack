<script setup lang="ts">
useHead({
	title: "Раковарня",
});
</script>

<template>
	<div :class="$style.main_wrapper">
		<h1 :class="$style.header">Раковарня &quot;Красный рак&quot;</h1>
		<div :class="$style.image_wrapper">
			<img :class="$style.main_image" src="main.jpg" alt="Red Raki" />
			<button :class="$style.buy_button">
				<UITheLink to="/catalogue">Хочу купить!</UITheLink>
			</button>
		</div>
		<div :class="$style.order_desc">
			<h2>Немного о раковарне и порядке заказа</h2>
			<p :class="$style.description">
				В Раковарне «Красный рак» вы можете заказать отменных
				<span style="font-weight: 700">
					вареных и живых раков. Наш главный принцип: варить только живого рака,
					только после получения от Вас заказа и только по проверенным
					классическим рецептам.
				</span>
			</p>
			<p :class="$style.description">
				Варку раков мы производим из высококачественного сырья прошедшего
				сертификацию и соотвествующего всем нормам и требованиям СанПин. Мы не
				экономим на Вашем здоровье, но экономим ваше время и деньги, что бы вы
				отдыхали наслаждаясь вкусом приготовленных нами раков.
			</p>
			<p :class="$style.description">
				Если вы желаете сами приготовить раков, то мы рады помочь вам в этом.
				Для этого мы доставим вам живых раков.
			</p>
			<p :class="$style.description">
				Купить наших варёных и живых раков, креветок, крабов, а так же наборы
				специй для самостоятельной варки можно в Мытищах, в Королёве, в
				Юбилейном, в Пироговском, в Пушкино.
			</p>
			<p :class="$style.description">
				Наши цены вас приятно удивят, как и ассортимент и превосходное качество
				продаваемого нами товара.
			</p>
			<p :class="$style.description">
				У нас имеются рассчитанные маршруты, поэтому вы можете быть уверены в
				том, что вы получите заказ в самые короткие сроки.
			</p>
			<p :class="$style.description" style="font-weight: 700">
				Мы не ВАРИМ РАКОВ ЗАРАНЕЕ, МЫ ВАРИМ ТОЛЬКО ЖИВОГО РАКА И ПОД ВАШ ЗАКАЗ!
			</p>
			<p :class="$style.description">
				Чтобы заказать раков в в ближайшей для Вас &quot;Раковарне Красный
				рак&quot; вам достаточно позвонить по телефону:
			</p>
			<ul
				style="
					list-style: none;
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 12px;
					padding: 12px;
				"
			>
				<li>
					<UITheLink href="tel:+79265403444" style="font-family: 'Open Sans'">
						8-926-540-34-44 Мытищи
					</UITheLink>
				</li>
				<li>
					<UITheLink href="tel:+79262703444" style="font-family: 'Open Sans'">
						8-926-270-34-44 Королев
					</UITheLink>
				</li>
				<li>
					<UITheLink href="tel:+79266033444" style="font-family: 'Open Sans'">
						8-926-603-34-44 Химки
					</UITheLink>
				</li>
				<li>
					<UITheLink href="tel:+79258383444" style="font-family: 'Open Sans'">
						8-925-838-34-44 Москва
					</UITheLink>
				</li>
			</ul>
			<p>
				и сообщить оператору каких раков, в каком количестве и куда доставить.
				Так же вы можете заказать обратный звонок и оператор сам перезвонит вам
				и уточнит детали заказа, поможет с выбором.
			</p>
			<p :class="$style.description" style="text-align: center">
				Часы работы раковарни
				<span style="font-weight: 700">ежедневно с 10:00 до 22:00</span>.
			</p>
			<p>
				ЗАКАЗЫ НА ДОСТАВКУ ПРИНИМАЮТЬСЯ НЕ ПОЗДНЕЕ 21:30. ВРЕМЯ ДОСТАВКИ В БУДНИ
				1.5-2ЧАСА, В ПЯТНИЦУ, ВЫХОДНЫЕ И ПРАЗДНИЧНЫЕ ДНИ ВРЕМЯ ДОСТАВКИ МОЖЕТ
				УВЕЛИЧИТЬСЯ!!!
			</p>
			<ul
				style="
					padding: 0 48px;
					display: flex;
					flex-direction: column;
					list-style: disc;
				"
			>
				<li>
					Доставка по г. Мытищи,г. Королев,г.Химки, Москва ЖК Скандинавия -от
					350₽
				</li>
				<li>
					Доставка в г. Пирогово, д.Беляниново, д.Бородино, д.Ховрино,
					д.Болтино, п.Вешки, п.Нагорное -от 450₽
				</li>
				<li>
					Доставка в мкр. Юбилейный, метро Медведково, п.Челюскинский, с.
					Тарасовка, п.Лесные поляны, д.Афанасово -от 500₽
				</li>
				<li>
					Доставка до станции метро Бабушкинская, метро Свиблово, п.
					Загорянский, Долгопрудный - от 550₽
				</li>
				<li>
					Доставка в д.Осташково, д.Никульское, д.Подрезово, д. Жостово,
					д.Сорокино, д.Чиверево, с.Троицкое (Золотой город), кот.пос. Жуковка,
					д.Куркино, Ивантеевка, Пушкино - от 600₽
				</li>
				<li>Доставка в г.Щелково, г.Балашиха -от 900₽</li>
				<li>Доставка в г. Фрязино - 1400₽</li>
			</ul>
			<p>
				Узнать точную стоимость доставки Вы можете позвонив по телефону в
				ближайшую для Вас раковарню
			</p>
			<p>
				При оплате через Сбербанк-Онлайн возможна отправка через службу такси,
				что сокращает время доставки. Стоимость доставки оплачивается по тарифу
				перевозчика. Вам всего лишь нужно встретить водителя. Подробности этого
				варианта доставки можно узнать позвонив нам!
			</p>
			<p>
				Оплата заказа производится наличными курьеру. Если Вам потребуется
				сдача, скажите об этом оператору при оформлении заказа. При получении
				заказа, оплатите его в соответствии с накладной, затем примите заказ,
				проверьте комплектность и только убедившись что все в порядке,
				отпускайте курьера.
			</p>
		</div>
	</div>
</template>

<style lang="scss" module>
.main_wrapper {
	margin: 24px 0;
	display: flex;
	flex-direction: column;
	gap: 24px;
}
.header {
	padding: 14px;
	background-color: #ebe3e1;
	border-radius: 24px;
	text-align: center;
	color: #911d28;
}
.image_wrapper {
	position: relative;
}
.main_image {
	height: 360px;
	width: 100%;
	border-radius: 24px;
	object-fit: cover;
}

.buy_button {
	position: absolute;
	right: 12px;
	bottom: 18px;
	padding: 14px 21px;
	border-radius: 24px;
	border: none;
	background-color: #ebe3e1;
}
.order_desc {
	background-color: #ebe3e1;
	color: #911d28;
	padding: 24px;
	font-size: 18px;
	border-radius: 24px;
	display: flex;
	flex-direction: column;
	gap: 13px;
}
.description {
	text-align: justify;
}
</style>
