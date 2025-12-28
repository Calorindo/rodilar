import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartItem } from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Carrinho = () => {
  const { items, totalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const shipping = totalPrice >= 200 ? 0 : 25.90;
  const finalTotal = totalPrice + shipping;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-hero-gradient py-12">
          <div className="container">
            <h1 className="font-heading text-4xl font-bold text-gremio-white text-center">
              Carrinho de Compras
            </h1>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {items.length > 0 ? (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-heading text-xl font-semibold text-foreground">
                      Itens ({items.length})
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Limpar Carrinho
                    </Button>
                  </div>

                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card">
                    <h2 className="font-heading text-xl font-semibold text-card-foreground mb-6">
                      Resumo do Pedido
                    </h2>

                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frete</span>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-green-600">Grátis</span>
                          ) : (
                            formatPrice(shipping)
                          )}
                        </span>
                      </div>
                      {shipping > 0 && (
                        <p className="text-xs text-muted-foreground bg-muted p-2 rounded-lg">
                          💡 Frete grátis para compras acima de R$ 200,00
                        </p>
                      )}
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between">
                          <span className="font-heading font-semibold text-lg">Total</span>
                          <span className="font-heading font-bold text-xl text-primary">
                            {formatPrice(finalTotal)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link to="/checkout" className="block mt-6">
                      <Button size="lg" className="w-full gap-2">
                        Finalizar Compra
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>

                    <Link to="/produtos" className="block mt-4">
                      <Button variant="outline" size="lg" className="w-full">
                        Continuar Comprando
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-muted mb-6">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
                  Seu carrinho está vazio
                </h2>
                <p className="text-muted-foreground mb-6">
                  Adicione produtos ao carrinho para continuar comprando.
                </p>
                <Link to="/produtos">
                  <Button size="lg" className="gap-2">
                    Ver Produtos
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Carrinho;
