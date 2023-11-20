<script setup lang="ts">
import { ICategoryResponse } from "~/@types";

const { $backendUrl } = useNuxtApp();
const { data, refresh, pending } = await useFetch<ICategoryResponse>(
	`${$backendUrl()}/api/category`,
	{ key: "category", method: "GET" }
);

function refreshCategories() {
	refresh({ dedupe: true });
}

const route = useRoute();

useHead({
	title() {
		return (
			data.value?.categories.find((c) => c.id === route.query.categoryId)
				?.name || "Ассортимент"
		);
	},
});
</script>

<template>
	<div v-if="pending">Loading...</div>
	<CategoryRow
		v-else
		:categoryList="data?.categories"
		@created="refreshCategories"
		@deleted="refreshCategories"
		@updated="refreshCategories"
	/>
	<div class="catalogue__wrapper">
		<slot/>
	</div>
</template>

<style lang="scss">
.catalogue_wrapper {
	display: grid;
	grid-template-columns: 1fr 4fr;
	gap: 20px;
}
</style>
