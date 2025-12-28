import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Truck, CreditCard, Shield, Award } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />

        {/* Why Choose Us Section */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Por que nos escolher?
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
                Vantagens Exclusivas
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Truck,
                  title: 'Entrega Rápida',
                  description: 'Entregamos para todo o Brasil com agilidade e segurança.',
                },
                {
                  icon: CreditCard,
                  title: 'Pagamento Facilitado',
                  description: 'Parcele em até 12x sem juros no cartão de crédito.',
                },
                {
                  icon: Shield,
                  title: 'Compra Segura',
                  description: 'Seus dados protegidos com a mais alta tecnologia.',
                },
                {
                  icon: Award,
                  title: 'Qualidade Garantida',
                  description: 'Produtos com garantia de fábrica e excelência.',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="group text-center p-6 rounded-xl bg-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-hero-gradient">
          <div className="container text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gremio-white mb-4">
              Pronto para comprar?
            </h2>
            <p className="text-gremio-white/80 max-w-lg mx-auto mb-8">
              Explore nossa linha completa de produtos e encontre tudo que você precisa com os melhores preços.
            </p>
            <a href="/produtos">
              <button className="inline-flex items-center gap-2 bg-gremio-white text-primary font-heading font-bold px-8 py-4 rounded-xl hover:bg-gremio-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Explorar Produtos
              </button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
