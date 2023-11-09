import { OrderStatuses } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";

export const createOrderSchema = Type.Object({
  address: Type.String(),
  phone: Type.String(),
  orderedProducts: Type.Array(Type.Object({
    amount: Type.Integer(),
    productId: Type.String(),
  })),
});
export type createOrderInput = Static<typeof createOrderSchema>;

export const createOrderResponseSchema = Type.Object({
  id: Type.String(),
  phone: Type.String(),
  address: Type.String(),
  total: Type.Number(),
});

export const getOrderInfoSchema = Type.Object({
  id: Type.String(),
});
export type getOrderInfoInput = Static<typeof getOrderInfoSchema>;

export const getOrderInfoResponseSchema = Type.Object({
  id: Type.String(),
  address: Type.String(),
  total: Type.Integer(),
  createdAt: Type.String(),
  status: Type.Enum(OrderStatuses),
  orderedProducts: Type.Array(Type.Object({
    amount: Type.Integer(),
    product: Type.Object({
      id: Type.String(),
      name: Type.String(),
      price: Type.Integer(),
      image: Type.String(),
    }),
  })),
});

export const getAllUserOrdersResponseSchema = Type.Object({
  count: Type.String(),
  orders: Type.Array(Type.Object({
    id: Type.String(),
    address: Type.String(),
    createdAt: Type.String(),
    total: Type.Integer(),
    orderedProducts: Type.Array(Type.Object({
      amount: Type.Integer(),
      product: Type.Object({
        id: Type.String(),
        name: Type.String(),
        price: Type.Integer(),
        image: Type.String(),
      }),      
    })),
  }))
});
