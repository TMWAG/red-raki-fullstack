<script setup lang="ts">
import { ICategoryResponse } from "~/@types";

const { $backendUrl } = useNuxtApp();
const { data, refresh } = await useFetch<ICategoryResponse>(
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
	<div>
		<CategoryRow
		:categoryList="data?.categories"
		@created="refreshCategories()"
		@deleted="refreshCategories()"
		@updated="refreshCategories()"
		/>
		<slot />

	</div>
</template>

<style lang="scss">
</style>
