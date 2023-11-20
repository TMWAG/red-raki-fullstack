import { UserRoles } from "@prisma/client";
import { Type, Static } from "@sinclair/typebox";

export const createUserSchema = Type.Object({
	phone: Type.RegExp(/^\([0-9]{3}\)([0-9]){3}(-([0-9]){2}){2}/gm),
	password: Type.String(),
});
export const createUserResponseSchema = Type.Object({
	id: Type.String(),
	phone: Type.String(),
	role: Type.Enum(UserRoles),
});

export const loginUserSchema = Type.Object({
	phone: Type.String(),
	password: Type.String(),
});

export const loginUserResponseSchema = Type.Object({
	phone: Type.String(),
	role: Type.Enum(UserRoles),
	token: Type.String(),
});

export const getAllUsersResponseSchema = Type.Object({
	count: Type.Integer(),
	users: Type.Array(
		Type.Object({
			id: Type.String(),
			name: Type.Optional(Type.String()),
			phone: Type.String(),
			role: Type.Enum(UserRoles),
		})
	),
});

export type CreateUserInput = Static<typeof createUserSchema>;
export type LoginUserInput = Static<typeof loginUserSchema>;
