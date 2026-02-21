import { CartItem } from "@/types/product";

const CART_STORAGE_KEY = "shopping-cart";

export const cartService = {
  // Buscar carrinho do localStorage
  async getCart(): Promise<CartItem[]> {
    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      if (cartData) {
        return JSON.parse(cartData);
      }
      return [];
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      return [];
    }
  },

  // Salvar carrinho no localStorage
  async saveCart(items: CartItem[]): Promise<void> {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
      throw error;
    }
  },

  // Limpar carrinho
  async clearCart(): Promise<void> {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      throw error;
    }
  }
};
