import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Nossos Produtos
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Produtos em Destaque
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Confira os produtos mais vendidos e melhores avaliados pelos nossos clientes.
            </p>
          </div>
          <Link to="/produtos">
            <Button variant="outline" className="gap-2">
              Ver Todos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
