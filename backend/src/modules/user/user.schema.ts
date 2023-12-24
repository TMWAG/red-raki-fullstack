import { EmployeeRoles } from "@prisma/client";
import { Type, Static } from "@sinclair/typebox";

/* export const createUserSchema = Type.Object({
	phone: Type.RegExp(/^\([0-9]{3}\)([0-9]){3}(-([0-9]){2}){2}/gm),
	password: Type.String(),
}); */
/* export const createUserResponseSchema = Type.Object({
	id: Type.String(),
	phone: Type.String(),
	role: Type.Enum(UserRoles),
}); */

export const createUserSchema = Type.Object({
	name: Type.String(),
	surname: Type.String(),
	role: Type.Enum(EmployeeRoles)
});

export type CreateUserInput = Static<typeof createUserSchema>;

export const createUserResponseSchema = Type.Object({
	login: Type.String(),
	name: Type.String(),
	surname: Type.String(),
});

export const loginUserSchema = Type.Object({
	login: Type.String(),
	password: Type.String(),
});

export const loginUserResponseSchema = Type.Object({
	id: Type.String(),
	role: Type.Enum(EmployeeRoles),
	token: Type.String(),
});

export const getAllUsersResponseSchema = Type.Object({
	count: Type.Integer(),
	users: Type.Array(
		Type.Object({
			id: Type.String(),
			name: Type.Optional(Type.String()),
			surname: Type.String(),
			role: Type.Enum(EmployeeRoles),
			login: Type.String(),
		})
	),
});

// export type CreateUserInput = Static<typeof createUserSchema>;
export type LoginUserInput = Static<typeof loginUserSchema>;
