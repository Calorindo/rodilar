import { ref, get, set, remove, update } from "firebase/database";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";

const PRODUCTS_PATH = "products";

export const productService = {
  // Buscar todos os produtos
  async getAll(): Promise<Product[]> {
    try {
      const productsRef = ref(db, PRODUCTS_PATH);
      const snapshot = await get(productsRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  },

  // Adicionar ou atualizar produto
  async save(product: Product): Promise<void> {
    try {
      const productRef = ref(db, `${PRODUCTS_PATH}/${product.id}`);
      await set(productRef, product);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      throw error;
    }
  },

  // Deletar produto
  async delete(productId: string): Promise<void> {
    try {
      const productRef = ref(db, `${PRODUCTS_PATH}/${productId}`);
      await remove(productRef);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw error;
    }
  },

  // Atualizar produto
  async update(productId: string, data: Partial<Product>): Promise<void> {
    try {
      const productRef = ref(db, `${PRODUCTS_PATH}/${productId}`);
      await update(productRef, data);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    }
  }
};
