/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 1.0.0
 */

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const OrderStatus = {
  open: 'open',
  closed: 'closed',
  processing: 'processing',
  canceled: 'canceled',
} as const;
