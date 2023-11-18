import { Static, Type } from "@sinclair/typebox";

const baseProduct = {
  name: Type.String(),
  description: Type.Optional(Type.String()),
  notes: Type.Optional(Type.String()),
  categoryId: Type.String(),
  price: Type.Integer(),
  image: Type.String(),
};

export const createProductSuccessResponseSchema = Type.Object({
  id: Type.String(),
  ...baseProduct,
})

export const getProductsSchema = Type.Object({
  categoryId: Type.Optional(Type.String()),
});
export type getProductsInput = Static<typeof getProductsSchema>;

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