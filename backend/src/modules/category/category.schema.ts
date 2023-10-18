import { Static, Type } from "@sinclair/typebox";

export const createCategorySchema = Type.Object({
  name: Type.String(),
});

export type createCategoryInput = Static<typeof createCategorySchema>;

export const createCategoryResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
})

export const getCategoriesResponseSchema = Type.Object({
  count: Type.Number(),
  categories: Type.Array(Type.Object({
    id: Type.String(),
    name: Type.String(),
  })),
});

export const updateCategoryBodySchema = Type.Object({
  name: Type.String(),
});
export const updateCategoryParamsSchema = Type.Object({
  id: Type.String(),
});
export type updateCategoryBodyInput = Static<typeof updateCategoryBodySchema>;
export type updateCategoryParamsInput = Static<typeof updateCategoryParamsSchema>;

export const updateCategoryResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
});

export const deleteCategorySchema = Type.Object({
  id: Type.String(),
});

export const deleteCategoryResponseSchema = Type.Object({
  id: Type.String(),
})

export type deleteCategoryInput = Static<typeof deleteCategorySchema>;