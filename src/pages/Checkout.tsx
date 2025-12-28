import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, User, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const shipping = totalPrice >= 200 ? 0 : 25.90;
  const finalTotal = totalPrice + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Pedido realizado com sucesso!', {
      description: 'Você receberá um e-mail com os detalhes do pedido.',
    });

    clearCart();
    setIsProcessing(false);
    navigate('/');
  };

  if (items.length === 0) {
    navigate('/carrinho');
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-hero-gradient py-12">
          <div className="container">
            <h1 className="font-heading text-4xl font-bold text-gremio-white text-center">
              Finalizar Compra
            </h1>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Personal Info */}
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <User className="h-5 w-5" />
                      </div>
                      <h2 className="font-heading text-xl font-semibold text-card-foreground">
                        Dados Pessoais
                      </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        type="text"
                        name="name"
                        placeholder="Nome Completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Telefone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Truck className="h-5 w-5" />
                      </div>
                      <h2 className="font-heading text-xl font-semibold text-card-foreground">
                        Endereço de Entrega
                      </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="CEP"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Endereço"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
                      />
                      <input
                        type="text"
                        name="number"
                        placeholder="Número"
                        value={formData.number}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="complement"
                        placeholder="Complemento"
                        value={formData.complement}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="neighborhood"
                        placeholder="Bairro"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="Cidade"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="Estado"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <h2 className="font-heading text-xl font-semibold text-card-foreground">
                        Pagamento
                      </h2>
                    </div>

                    <div className="p-4 rounded-lg bg-muted border border-border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">Mercado Pago</p>
                          <p className="text-sm text-muted-foreground">
                            Você será redirecionado para o Mercado Pago para finalizar o pagamento.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                      * Integração com Mercado Pago requer configuração de backend. 
                      Para habilitar pagamentos reais, conecte ao Lovable Cloud.
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card">
                    <h2 className="font-heading text-xl font-semibold text-card-foreground mb-6">
                      Resumo do Pedido
                    </h2>

                    <div className="space-y-3 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 border-t border-border pt-4">
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
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between">
                          <span className="font-heading font-semibold text-lg">Total</span>
                          <span className="font-heading font-bold text-xl text-primary">
                            {formatPrice(finalTotal)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full mt-6"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Processando...
                        </span>
                      ) : (
                        'Confirmar Pedido'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
