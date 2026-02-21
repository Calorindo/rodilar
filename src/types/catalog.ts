export interface Catalog {
  id: string;
  name: string;
  description: string;
  productIds: string[]; // IDs dos produtos vinculados
  createdAt: string;
  updatedAt: string;
}
