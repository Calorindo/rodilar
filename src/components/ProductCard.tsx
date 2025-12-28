import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/80">
            <span className="font-heading font-semibold text-secondary-foreground">
              Esgotado
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading font-semibold text-lg text-card-foreground line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            variant="cart"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
