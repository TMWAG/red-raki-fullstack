<script setup lang="ts">
import { ICategory, ICategoryResponse } from "~/@types";
const role = useCookie("role");
const addModalVisibility = ref<boolean>(false);
const categoryToUpdate = ref<ICategory>();
const categoryToDelete = ref<ICategory>();

const onCategoryCreated = () => {
	refresh({ dedupe: true });
	hideAddModal();
};
const onCategoryDeleted = () => {
	refresh({ dedupe: true });
	hideDelModal();
};
const onCategoryEdited = () => {
	refresh({ dedupe: true });
	hideEditModal();
};
const { $backendUrl } = useNuxtApp();
const { data, refresh } = await useFetch<ICategoryResponse>(
	`${$backendUrl()}/api/category`,
	{ key: "category" }
);

const showAddModal = () => {
	addModalVisibility.value = true;
};
const hideAddModal = () => {
	addModalVisibility.value = false;
};
const showEditModal = (c: ICategory) => {
	categoryToUpdate.value = c;
};
const hideEditModal = () => {
	categoryToUpdate.value = undefined;
};
const showDelModal = (c: ICategory) => {
	categoryToDelete.value = c;
};
const hideDelModal = () => {
	categoryToDelete.value = undefined;
};
const editButtonsVisibility = computed(() => {
	return role.value === "ADMIN" || role.value === "SUPERVISOR";
});

const route = useRoute();

useHead({
	title() {
		return (
			data.value?.categories.find((c) => c.id === route.query.categoryId)?.name ||
			"Ассортимент"
		);
	},
});
</script>

<template>
	<div class="catalogue_wrapper">
		<div class="categories_nav">
			<span> Категории </span>
			<nav>
				<ul>
					<li v-for="c in data?.categories" :key="c.id">
						<NuxtLink
							class="nav_link"
							:class="c.id === $route.query.categoryId ? 'active' : ''"
							:to="`/catalogue?categoryId=${c.id}`"
							>{{ c.name }}</NuxtLink
						>
						<EditButton
							v-if="editButtonsVisibility"
							@edit="showEditModal(c)"
							width="24px"
							height="24px"
						/>
						<DeleteButton
							v-if="editButtonsVisibility"
							@delete="showDelModal(c)"
							width="24px"
							height="24px"
						/>
					</li>
				</ul>
			</nav>
			<button class="button" v-if="editButtonsVisibility" @click="showAddModal">
				Добавить категорию
			</button>
		</div>
		<slot :categoryId="$route.query.categoryId" />
		<AddCategoryModal
			v-if="addModalVisibility"
			@canceled="hideAddModal"
			@category-created="onCategoryCreated"
		/>
		<DeleteCategoryModal
			v-if="categoryToDelete"
			:category-to-delete="categoryToDelete"
			@deleted="onCategoryDeleted"
			@canceled="hideDelModal"
		/>
		<EditCategoryModal
			v-if="categoryToUpdate"
			:category-to-update="categoryToUpdate"
			@canceled="hideEditModal"
			@edited="onCategoryEdited"
		/>
	</div>
</template>

<style lang="scss" scoped>
@use "assets/colors";
.catalogue_wrapper {
	display: grid;
	grid-template-columns: 1fr 4fr;
	gap: 0.5rem;
}
.categories_nav {
	border: 2px solid colors.$accent;
	border-radius: 5px;
	height: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
	padding: 0.5rem 0;
	background-color: colors.$white;
	ul {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
		list-style: none;
		li {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		a {
			font-size: 1.25rem;
			text-align: center;
		}
	}
	span {
		display: block;
		font-size: 1.25rem;
	}
}
.button {
	font-size: 1rem;
	height: 2rem;
	width: fit-content;
	padding: 0 0.25rem;
	border: 2px solid colors.$accent;
	border-radius: 3px;
	background-color: white;
	transition: border-color, scale ease-in-out 0.3s;
	&:hover {
		scale: 105%;
		border-color: colors.$primary;
		transition: border-color, scale ease-in-out 0.3s;
	}
}
.nav_link {
	text-decoration: none;
	background-image: linear-gradient(
		to right,
		colors.$primary,
		colors.$primary 50%,
		colors.$warn 50%
	);
	background-size: 200% 100%;
	background-position: -100%;
	display: inline-block;
	position: relative;
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	transition: all 0.3s ease-in-out;
	&:before {
		content: "";
		background: colors.$primary;
		display: block;
		position: absolute;
		bottom: -3px;
		left: 0;
		width: 0;
		height: 3px;
		transition: all 0.3s ease-in-out;
	}
	&:hover {
		background-position: 0;
	}
	&:hover::before {
		width: 100%;
	}
	&:focus {
		background-position: 0;
	}
	&:focus::before {
		width: 100%;
	}
	&.active {
		background-position: 0;
		&::before {
			width: 100%;
		}
	}
}
</style>
