<script setup lang="ts">
import { ICategory } from "~/@types";

defineProps<{
	categoryList?: ICategory[];
}>();

const emit = defineEmits<{
	(e: "created"): void;
	(e: "updated"): void;
	(e: "deleted"): void;
}>();

const addModalVisibility = ref<boolean>(false);
function showAddModal() {
	addModalVisibility.value = true;
}
function hideAddModal() {
	addModalVisibility.value = false;
}
function onCategoryCreated() {
	hideAddModal();
	emit("created");
}

const categoryToUpdate = ref<ICategory>();
function showEditModal(c: ICategory) {
	categoryToUpdate.value = c;
}
function hideEditModal() {
	categoryToUpdate.value = undefined;
}
function onCategoryEdited() {
	emit("updated");
	hideEditModal();
}

const categoryToDelete = ref<ICategory>();
function showDeleteModal(c: ICategory) {
	categoryToDelete.value = c;
}
function hideDelModal() {
	categoryToDelete.value = undefined;
}
function onCategoryDeleted() {
	emit("deleted");
	hideDelModal();
}

const role = useCookie("role");
const editButtonsVisibility = computed(() => {
	return role.value === "ADMIN" || role.value === "SUPERVISOR";
});
</script>

<template>
	<div class="category-list">
		<h2 class="category-list__header">Категории продукции</h2>
		<div class="category-list__categories">
			<UICategoryChip
				v-for="c in categoryList"
				:category="c"
				:key="`category-${c.id}`"
				@delete="showDeleteModal(c)"
				@edit="showEditModal(c)"
				:edit-buttons-visibility="editButtonsVisibility"
			/>
			<div v-if="editButtonsVisibility" class="chip">
				<span class="chip__link" @click="showAddModal">
					Добавить категорию
				</span>
			</div>
			<LazyFormCategoryAdd
				v-if="addModalVisibility"
				@canceled="hideAddModal"
				@category-created="onCategoryCreated"
			/>
			<LazyFormCategoryEdit
				v-if="categoryToUpdate"
				:category-to-update="categoryToUpdate"
				@canceled="hideEditModal"
				@edited="onCategoryEdited"
			/>
			<LazyFormCategoryDelete
				v-if="categoryToDelete"
				:category-to-delete="categoryToDelete"
				@canceled="hideDelModal"
				@deleted="onCategoryDeleted"
			/>
		</div>
	</div>
</template>

<style lang="scss">
.category-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	padding: 16px 0 21px 0;
	&__header {
		color: #911D28;
		font-size: 20px;
	}
	&__categories {
		gap: 6px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
}
</style>
