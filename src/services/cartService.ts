import { ref, get, set, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import { CartItem } from "@/types/product";

const CARTS_PATH = "carts";

// Gera ou recupera um ID único para o usuário (pode ser substituído por autenticação)
const getUserId = (): string => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("userId", userId);
  }
  return userId;
};

export const cartService = {
  // Buscar carrinho do usuário
  async getCart(): Promise<CartItem[]> {
    try {
      const userId = getUserId();
      const cartRef = ref(db, `${CARTS_PATH}/${userId}`);
      const snapshot = await get(cartRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data.items || [];
      }
      return [];
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      return [];
    }
  },

  // Salvar carrinho do usuário
  async saveCart(items: CartItem[]): Promise<void> {
    try {
      const userId = getUserId();
      const cartRef = ref(db, `${CARTS_PATH}/${userId}`);
      await set(cartRef, {
        items,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
      throw error;
    }
  },

  // Limpar carrinho
  async clearCart(): Promise<void> {
    try {
      const userId = getUserId();
      const cartRef = ref(db, `${CARTS_PATH}/${userId}`);
      await remove(cartRef);
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      throw error;
    }
  }
};
