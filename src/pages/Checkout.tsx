import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, User, FileText, Banknote } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { settingsService } from '@/services/settingsService';
import { toast } from 'sonner';

type PaymentMethod = 'pix' | 'boleto-7' | 'boleto-14' | 'boleto-28';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [danfeNote, setDanfeNote] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('5551992155747');
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

  useEffect(() => {
    // Carregar número do WhatsApp das configurações
    const loadWhatsAppNumber = async () => {
      try {
        const number = await settingsService.getWhatsAppNumber();
        setWhatsappNumber(number);
      } catch (error) {
        console.error('Erro ao carregar número do WhatsApp:', error);
        // Mantém o número padrão em caso de erro
      }
    };
    
    loadWhatsAppNumber();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const shipping = totalPrice >= 200 ? 0 : 25.90;
  const discount = paymentMethod === 'pix' ? totalPrice * 0.05 : 0;
  const finalTotal = totalPrice + shipping - discount;

  const getPaymentMethodLabel = () => {
    switch (paymentMethod) {
      case 'pix':
        return 'PIX (5% de desconto)';
      case 'boleto-7':
        return 'Boleto - 7 dias';
      case 'boleto-14':
        return 'Boleto - 14 dias';
      case 'boleto-28':
        return 'Boleto - 28 dias';
      default:
        return '';
    }
  };

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

    // Formatar mensagem para WhatsApp
    const itemsList = items
      .map((item, index) => 
        `${index + 1}. ${item.name}\nQuantidade: ${item.quantity}x\nPreço unitário: ${formatPrice(item.price)}\nSubtotal: ${formatPrice(item.price * item.quantity)}`
      )
      .join('\n\n');

    const message = `🛒 *NOVO PEDIDO - Rodilar*

📋 *DADOS PESSOAIS*
Nome: ${formData.name}
E-mail: ${formData.email}
CPF: ${formData.cpf}
Telefone: ${formData.phone}

📍 *ENDEREÇO DE ENTREGA*
CEP: ${formData.zipCode}
Endereço: ${formData.address}, ${formData.number}${formData.complement ? `, ${formData.complement}` : ''}
Bairro: ${formData.neighborhood}
Cidade: ${formData.city} - ${formData.state}

📦 *ITENS DO PEDIDO*
${itemsList}

💰 *RESUMO FINANCEIRO*
Subtotal: ${formatPrice(totalPrice)}
Frete: ${shipping === 0 ? 'Grátis' : formatPrice(shipping)}${discount > 0 ? `\nDesconto à vista (5%): -${formatPrice(discount)}` : ''}
*Total: ${formatPrice(finalTotal)}*

💳 *FORMA DE PAGAMENTO*
${getPaymentMethodLabel()}

📄 *NOTA FISCAL (DANFE)*
${danfeNote || 'Não informado'}

_Pedido gerado automaticamente pelo site_`;

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Redirecionando para WhatsApp...', {
      description: 'Complete seu pedido pelo WhatsApp.',
    });

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    clearCart();
    setIsProcessing(false);
    
    // Redirecionar para home após um delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
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
                        Forma de Pagamento
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {/* PIX */}
                      <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'pix' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border bg-background hover:border-primary/50'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="pix"
                          checked={paymentMethod === 'pix'}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Banknote className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">PIX</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              5% OFF
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Pagamento instantâneo com desconto
                          </p>
                        </div>
                      </label>

                      {/* Boleto 7 dias */}
                      <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'boleto-7' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border bg-background hover:border-primary/50'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="boleto-7"
                          checked={paymentMethod === 'boleto-7'}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">Boleto - 7 dias</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Vencimento em 7 dias
                          </p>
                        </div>
                      </label>

                      {/* Boleto 14 dias */}
                      <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'boleto-14' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border bg-background hover:border-primary/50'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="boleto-14"
                          checked={paymentMethod === 'boleto-14'}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">Boleto - 14 dias</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Vencimento em 14 dias
                          </p>
                        </div>
                      </label>

                      {/* Boleto 28 dias */}
                      <label className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'boleto-28' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border bg-background hover:border-primary/50'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="boleto-28"
                          checked={paymentMethod === 'boleto-28'}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">Boleto - 28 dias</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Vencimento em 28 dias
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* DANFE Note */}
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <FileText className="h-5 w-5" />
                      </div>
                      <h2 className="font-heading text-xl font-semibold text-card-foreground">
                        Nota Fiscal (DANFE)
                      </h2>
                    </div>

                    <textarea
                      name="danfeNote"
                      placeholder="Informações adicionais para a nota fiscal (opcional)"
                      value={danfeNote}
                      onChange={(e) => setDanfeNote(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
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
                      {discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Desconto PIX (5%)</span>
                          <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
                        </div>
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
