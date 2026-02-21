import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones, Package, Container, Boxes } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient min-h-[600px] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="inline-block rounded-full bg-gremio-white/10 px-4 py-2 text-sm font-semibold text-gremio-white backdrop-blur-sm border border-gremio-white/20 animate-fade-in-up">
                🎉 Frete Grátis acima de R$ 200
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-gremio-white leading-tight animate-fade-in-up animation-delay-100">
                Qualidade em<br />
                <span className="relative">
                  Produtos Plásticos
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C50 4 150 2 298 6" stroke="hsl(207 80% 50%)" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-gremio-white/80 max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                Oferecemos a melhor linha de produtos plásticos para sua casa e empresa. 
                Qualidade, durabilidade e preço justo há mais de 20 anos.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
              <Link to="/produtos">
                <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Ver Produtos
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/catalogos">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  Ver Catálogos
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visual - Product Icons Grid */}
          <div className="relative animate-fade-in-up animation-delay-400">
            <div className="relative">
              {/* Main Product Display */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-12 shadow-2xl">
                <div className="grid grid-cols-3 gap-8">
                  {/* Product Icons */}
                  <div className="flex flex-col items-center gap-3 animate-float">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Package className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-xs text-white/80 font-medium">Baldes</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 animate-float animation-delay-100">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Container className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-xs text-white/80 font-medium">Potes</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 animate-float animation-delay-200">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Boxes className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-xs text-white/80 font-medium">Caixas</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 animate-float animation-delay-300">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <ShoppingBag className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-xs text-white/80 font-medium">Sacolas</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 animate-float animation-delay-100">
                    <div className="w-20 h-20 rounded-2xl bg-accent/80 backdrop-blur-sm flex items-center justify-center border border-accent shadow-lg shadow-accent/50">
                      <Package className="w-10 h-10 text-gremio-black" />
                    </div>
                    <span className="text-xs text-white/80 font-medium">Destaque</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 animate-float animation-delay-200">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Container className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-xs text-white/80 font-medium">Utilidades</span>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-accent/20 blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-primary/20 blur-2xl"></div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-gremio-white rounded-xl p-4 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-heading font-bold text-gremio-black">Entrega Rápida</p>
                  <p className="text-sm text-muted-foreground">Para todo Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gremio-black/20 backdrop-blur-sm border-t border-gremio-white/10">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 text-gremio-white">
              <Truck className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Entrega Rápida</span>
            </div>
            <div className="flex items-center gap-3 text-gremio-white">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Compra Segura</span>
            </div>
            <div className="flex items-center gap-3 text-gremio-white">
              <ShoppingBag className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">+500 Produtos</span>
            </div>
            <div className="flex items-center gap-3 text-gremio-white">
              <Headphones className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Suporte 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
