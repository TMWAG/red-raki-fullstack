export interface IRegisterUserResponse {
	id: string;
	phone: string;
	role: "BUYER" | "SUPERVISOR" | "ADMIN";
}

export interface ILoginUserResponse {
	phone: string;
	role: 'BUYER' | 'SUPERVISOR' | 'ADMIN';
	token: string;	
}

export interface INotification {
	id: string;
	header: string;
	message: string;
	type: "error" | "warning" | "info";
}

export interface ICategory {
	id: string;
	name: string;
}

export interface ICategoryResponse {
	count: number;
	categories: ICategory[];
}

export interface IDeleteCategoryResponse {
	id: string;
}

export interface IProduct {
	id: string;
	name: string;
	description: string;
	categoryId: string;
	price: number;
	image: string;
}

export interface ICreateProductResponse extends IProduct {}

export interface IProductResponse {
	count: number;
	products: IProduct[];
}

export interface IOrderedProduct {
	amount: number;
	product: IProduct;
}
