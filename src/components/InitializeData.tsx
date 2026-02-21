import { useEffect, useState } from 'react';
import { seedProducts } from '@/scripts/seedProducts';
import { productService } from '@/services/productService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function InitializeData() {
  const [hasProducts, setHasProducts] = useState<boolean | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    checkProducts();
  }, []);

  const checkProducts = async () => {
    try {
      const products = await productService.getAll();
      setHasProducts(products.length > 0);
    } catch (error) {
      console.error('Erro ao verificar produtos:', error);
      setHasProducts(false);
    }
  };

  const handleSeedProducts = async () => {
    setIsSeeding(true);
    try {
      await seedProducts();
      toast.success('Produtos inicializados com sucesso!');
      setHasProducts(true);
    } catch (error) {
      console.error('Erro ao inicializar produtos:', error);
      toast.error('Erro ao inicializar produtos');
    } finally {
      setIsSeeding(false);
    }
  };

  if (hasProducts === null) {
    return null;
  }

  if (hasProducts) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
        <h2 className="text-2xl font-bold mb-4">Inicializar Catálogo</h2>
        <p className="mb-6 text-gray-600">
          O catálogo de produtos está vazio. Deseja carregar os produtos iniciais no Firebase?
        </p>
        <Button 
          onClick={handleSeedProducts} 
          disabled={isSeeding}
          className="w-full"
        >
          {isSeeding ? 'Carregando...' : 'Inicializar Produtos'}
        </Button>
      </div>
    </div>
  );
}
