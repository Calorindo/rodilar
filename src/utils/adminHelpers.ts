import { productService } from '@/services/productService';
import { Product } from '@/types/product';

/**
 * Funções auxiliares para administração de produtos
 * Estas funções podem ser chamadas do console do navegador para gerenciar produtos
 */

export const adminHelpers = {
  /**
   * Adicionar um novo produto
   * Exemplo de uso no console:
   * adminHelpers.addProduct({ id: '9', name: 'Novo Produto', ... })
   */
  async addProduct(product: Product) {
    try {
      await productService.save(product);
      console.log('✅ Produto adicionado com sucesso:', product.name);
      return true;
    } catch (error) {
      console.error('❌ Erro ao adicionar produto:', error);
      return false;
    }
  },

  /**
   * Atualizar um produto existente
   * Exemplo: adminHelpers.updateProduct('1', { price: 19.90 })
   */
  async updateProduct(productId: string, updates: Partial<Product>) {
    try {
      await productService.update(productId, updates);
      console.log('✅ Produto atualizado com sucesso:', productId);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar produto:', error);
      return false;
    }
  },

  /**
   * Deletar um produto
   * Exemplo: adminHelpers.deleteProduct('1')
   */
  async deleteProduct(productId: string) {
    try {
      await productService.delete(productId);
      console.log('✅ Produto deletado com sucesso:', productId);
      return true;
    } catch (error) {
      console.error('❌ Erro ao deletar produto:', error);
      return false;
    }
  },

  /**
   * Listar todos os produtos
   * Exemplo: adminHelpers.listProducts()
   */
  async listProducts() {
    try {
      const products = await productService.getAll();
      console.table(products);
      return products;
    } catch (error) {
      console.error('❌ Erro ao listar produtos:', error);
      return [];
    }
  },

  /**
   * Atualizar preço de múltiplos produtos
   * Exemplo: adminHelpers.bulkUpdatePrices([{ id: '1', price: 20 }, { id: '2', price: 50 }])
   */
  async bulkUpdatePrices(updates: Array<{ id: string; price: number }>) {
    try {
      const promises = updates.map(({ id, price }) =>
        productService.update(id, { price })
      );
      await Promise.all(promises);
      console.log('✅ Preços atualizados com sucesso');
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar preços:', error);
      return false;
    }
  },

  /**
   * Marcar produto como fora de estoque
   * Exemplo: adminHelpers.setOutOfStock('1')
   */
  async setOutOfStock(productId: string) {
    return this.updateProduct(productId, { inStock: false });
  },

  /**
   * Marcar produto como em estoque
   * Exemplo: adminHelpers.setInStock('1')
   */
  async setInStock(productId: string) {
    return this.updateProduct(productId, { inStock: true });
  }
};

// Expor no window para uso no console (apenas em desenvolvimento)
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).adminHelpers = adminHelpers;
  console.log('🔧 Admin helpers disponíveis no console: window.adminHelpers');
}
