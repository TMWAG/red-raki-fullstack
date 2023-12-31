import { IOrderedProduct, IProduct } from "~/@types";
import { useLocalStorage } from "@vueuse/core";

const STORE_NAME = "cart";

export const useCartStore = defineStore(STORE_NAME, () => {
	const productList = ref(useLocalStorage(STORE_NAME, [] as IOrderedProduct[]));

	function addProduct(product: IProduct) {
		const idx = productList.value.findIndex((op) => op.product.id === product.id);
		if (idx !== -1) {
			productList.value[idx].amount++
		} else {
			productList.value.push({
				product,
				amount: 1,
			});
		}	
	};
	function removeProduct(id: string) {
		const idx = productList.value.findIndex((op) => op.product.id === id);
		if (productList.value[idx].amount > 1) {
			productList.value[idx].amount--;
		}	else {
			productList.value.splice(idx, 1);
		};
	};
	function deleteProduct(id: string) {
		const idx = productList.value.findIndex((op) => op.product.id === id);
		if (idx !== -1) {
			productList.value.splice(idx, 1);
		}
	};
	function isInCart(id: string) {
		return productList.value.find((op) => op.product.id === id)?.amount; 
	};

	return {
		productList,
		addProduct,
		removeProduct,
		deleteProduct,
		isInCart,
	};
}, {
	persist: true,
});
