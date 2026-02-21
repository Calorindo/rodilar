import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';
import { toast } from 'sonner';

interface ProductContextType {
  products: Product[];
  categories: string[];
  isLoading: boolean;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast.error("Erro ao carregar produtos do catálogo");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Extrair categorias únicas dos produtos
  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        isLoading,
        refreshProducts: loadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
