import { ref, get, set, remove, update } from "firebase/database";
import { db } from "@/lib/firebase";
import { Catalog } from "@/types/catalog";

const CATALOGS_PATH = "catalogs";

export const catalogService = {
  // Buscar todos os catálogos
  async getAll(): Promise<Catalog[]> {
    try {
      const catalogsRef = ref(db, CATALOGS_PATH);
      const snapshot = await get(catalogsRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error("Erro ao buscar catálogos:", error);
      throw error;
    }
  },

  // Buscar catálogo por ID
  async getById(catalogId: string): Promise<Catalog | null> {
    try {
      const catalogRef = ref(db, `${CATALOGS_PATH}/${catalogId}`);
      const snapshot = await get(catalogRef);
      
      if (snapshot.exists()) {
        return {
          id: catalogId,
          ...snapshot.val()
        };
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar catálogo:", error);
      throw error;
    }
  },

  // Criar ou atualizar catálogo
  async save(catalog: Catalog): Promise<void> {
    try {
      const catalogRef = ref(db, `${CATALOGS_PATH}/${catalog.id}`);
      await set(catalogRef, {
        ...catalog,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Erro ao salvar catálogo:", error);
      throw error;
    }
  },

  // Deletar catálogo
  async delete(catalogId: string): Promise<void> {
    try {
      const catalogRef = ref(db, `${CATALOGS_PATH}/${catalogId}`);
      await remove(catalogRef);
    } catch (error) {
      console.error("Erro ao deletar catálogo:", error);
      throw error;
    }
  },

  // Adicionar produto ao catálogo
  async addProduct(catalogId: string, productId: string): Promise<void> {
    try {
      const catalog = await this.getById(catalogId);
      if (!catalog) throw new Error("Catálogo não encontrado");
      
      if (!catalog.productIds.includes(productId)) {
        catalog.productIds.push(productId);
        await this.save(catalog);
      }
    } catch (error) {
      console.error("Erro ao adicionar produto ao catálogo:", error);
      throw error;
    }
  },

  // Remover produto do catálogo
  async removeProduct(catalogId: string, productId: string): Promise<void> {
    try {
      const catalog = await this.getById(catalogId);
      if (!catalog) throw new Error("Catálogo não encontrado");
      
      catalog.productIds = catalog.productIds.filter(id => id !== productId);
      await this.save(catalog);
    } catch (error) {
      console.error("Erro ao remover produto do catálogo:", error);
      throw error;
    }
  },

  // Atualizar produtos do catálogo
  async updateProducts(catalogId: string, productIds: string[]): Promise<void> {
    try {
      const catalogRef = ref(db, `${CATALOGS_PATH}/${catalogId}/productIds`);
      await set(catalogRef, productIds);
      
      const updatedAtRef = ref(db, `${CATALOGS_PATH}/${catalogId}/updatedAt`);
      await set(updatedAtRef, new Date().toISOString());
    } catch (error) {
      console.error("Erro ao atualizar produtos do catálogo:", error);
      throw error;
    }
  }
};
