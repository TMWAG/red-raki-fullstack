<script setup lang="ts">
import { IProductResponse, IProduct } from "~/@types";

const cartStore = useCartStore();
const route = useRoute();
const categoryId = computed(() => {
	return route.query.categoryId;
});

const { $backendUrl } = useNuxtApp();
const { data, refresh } = useFetch<IProductResponse>(
	`${$backendUrl()}/api/product`,
	{
		key: "product",
		method: "GET",
		query: { categoryId },
	}
);

const role = useCookie("role");
const editButtonsVisibility = computed(
	() => role.value === "ADMIN" || role.value === "SUPERVISOR"
);

const addModalVisibility = ref<boolean>(false);
const showAddModal = () => {
	addModalVisibility.value = true;
};
const hideAddModal = () => {
	addModalVisibility.value = false;
};
const onProductCreated = () => {
	refresh({ dedupe: true });
	hideAddModal();
};

const productToEdit = ref<IProduct>();
const showEditModal = (p: IProduct) => {
	productToEdit.value = p;
};
const hideEditModal = () => {
	productToEdit.value = undefined;
};
const onProductEdited = () => {
	refresh({ dedupe: true });
	hideEditModal();
};

const productToDelete = ref<IProduct>();
const showDelModal = (p: IProduct) => {
	productToDelete.value = p;
};
const hideDelModal = () => {
	productToDelete.value = undefined;
};
const onProductDeleted = () => {
	refresh({ dedupe: true });
	hideDelModal();
};
</script>

<template>
	<div style="margin-bottom: 24px;">
		<NuxtLayout name="catalogue-layout">
			<div class="catalogue">
				<button
					v-if="editButtonsVisibility"
					@click="showAddModal"
					class="catalogue__add-product-button"
				>
					Добавить товар
				</button>
				<UITheProductCard
					v-for="p in data?.products"
					:product="p"
					:key="`product-${p.id}`"
					@delete="showDelModal(p)"
					@edit="showEditModal(p)"
					@add-to-cart="cartStore.addProduct(p)"
				/>
			</div>
		</NuxtLayout>
		<AddProductForm
			:category-id="(categoryId as string)"
			v-if="addModalVisibility"
			@canceled="hideAddModal"
			@product-created="onProductCreated"
		/>
		<EditProductModal
			v-if="productToEdit"
			:product="productToEdit"
			@closed="hideEditModal"
			@edited="onProductEdited"
		/>
		<DeleteProductModal
			v-if="productToDelete"
			:product="productToDelete"
			@canceled="hideDelModal"
			@deleted="onProductDeleted"
		/>
	</div>
</template>

<style lang="scss">
.catalogue {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 20px;
	&__add-product-button {
		height: 480px;
		border-radius: 24px;
		border: none;
		background-color: #fbfbfb;
		font-size: 1.5rem;
		transition: scale ease-in-out 0.2s;
		box-shadow: 2px 6px 16px 0px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		&:hover {
			scale: 101%;
		}
	}
}
</style>
