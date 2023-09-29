import { Static, Type } from "@sinclair/typebox";

const baseProduct = {
  name: Type.String(),
  description: Type.Optional(Type.String()),
  categoryId: Type.String(),
  price: Type.Integer(),
};

export const createProductSchema = Type.Object({
  ...baseProduct,
});
export type createProductInput = Static<typeof createProductSchema>;

export const createProductResponseSchema = Type.Object({
  id: Type.String(),
  ...baseProduct,
})

export const getProductsResponseSchema = Type.Object({
  count: Type.Integer(),
  products: Type.Array(Type.Object({
    id: Type.String(),
    ...baseProduct,
  })),
});

export const getProductSchema = Type.Object({
  id: Type.String(),
});
export type getProductInput = Static<typeof getProductSchema>;

export const getProductResponseSchema = Type.Object({
  id: Type.String(),
  ...baseProduct,
});

export const updateProductSchema = Type.Object({
  id: Type.String(),
  ...baseProduct,
})
export type updateProductInput = Static<typeof updateProductSchema>;

export const updateProductResponseSchema = Type.Object({
  id: Type.String(),
  ...baseProduct,
});

export const deleteProductSchema = Type.Object({
  id: Type.String()
});
export type deleteProductInput = Static<typeof deleteProductSchema>;

export const deleteProductResponseSchema = Type.Object({
  id: Type.String(),
});