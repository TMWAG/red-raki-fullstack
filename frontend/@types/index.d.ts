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
	notes: string;
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

export interface IOrderResponse {
	id: string;
	phone: string;
	address: string;
	total: number;
	status: "ACCEPTED" | "IN_DELIVERY" | "DELIVERED";
	createdAt: string;
	updatedAt: string;
}[]

export interface ICreateUserResponse {
	id: string;
	name: string;
	surname: string;
	login: string;
	role: "ADMIN" | "SUPERVISOR"
}

export interface IUserListResponse {
	count: number;
	users: ICreateUserResponse[];
}

