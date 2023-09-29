import { Type } from "@sinclair/typebox";

export const createCategoryResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  image: Type.String(),
})

export const getCategoriesResponseSchema = Type.Object({
  count: Type.Number(),
  categories: Type.Array(Type.Object({
    id: Type.String(),
    name: Type.String(),
    image: Type.String(),
  })),
});

export const updateCategoryResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  image: Type.String(),
});

export const deleteCategorySchema = Type.String();