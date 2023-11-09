<script setup lang="ts">
import { IProduct, IProductResponse } from "~/@types";

const route = useRoute();
const { $backendUrl } = useNuxtApp();
const categoryId = computed(() => {
	return route.query.categoryId;
});
const { data, refresh } = useFetch<IProductResponse>(
	`${$backendUrl()}/api/product`,
	{
		query: {
			categoryId,
		},
	}
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
const role = useCookie('role');
const editButtonsVisibility = computed(() => {
	return role.value === "ADMIN" || role.value === "SUPERVISOR";
});

const productToEdit = ref<IProduct>()
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
}
</script>

<template>
	<div>
		<NuxtLayout name="catalogue-layout">
			<div class="catalogue_products">
				<button v-if="editButtonsVisibility" @click="showAddModal" class="add_product_button">
					Добавить товар
				</button>
				<ProductCard
				v-for="p in data?.products"
				:product="p"
				:key="`product-${p.id}`"
				@delete-product="showDelModal"
				@edit-product="showEditModal"
				/>
			</div>
		</NuxtLayout>
		<AddProductForm
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

<style lang="scss" scoped>
@use "/assets/colors";
.catalogue_products {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 0.5rem;
}
.add_product_button {
	border: 2px solid colors.$accent;
	border-radius: 3px;
	background-color: colors.$white;
	font-size: 1.5rem;
	transition: scale ease-in-out 0.2s;
	&:hover {
		scale: 105%;
	}
}
</style>
