import { Link } from 'react-router-dom';
import { Package, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { settingsService } from '@/services/settingsService';

export function Footer() {
  const [whatsappNumber, setWhatsappNumber] = useState('5551992155747');

  useEffect(() => {
    // Carregar número do WhatsApp das configurações
    const loadWhatsAppNumber = async () => {
      try {
        const number = await settingsService.getWhatsAppNumber();
        setWhatsappNumber(number);
      } catch (error) {
        console.error('Erro ao carregar número do WhatsApp:', error);
      }
    };
    
    loadWhatsAppNumber();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de mais informações sobre os produtos.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const formatWhatsAppDisplay = (number: string) => {
    // Formata 5551992155747 para (51) 9215-5747
    if (number.length >= 13) {
      const ddd = number.substring(2, 4);
      const part1 = number.substring(4, 8);
      const part2 = number.substring(8, 13);
      return `(${ddd}) ${part1}-${part2}`;
    }
    return number;
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Package className="h-6 w-6" />
              </div>
              <span className="font-heading text-xl font-bold">
                Rodilar<span className="text-primary"></span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Há mais de 20 anos oferecendo os melhores produtos plásticos para sua casa e empresa.
            </p>
            <div className="flex gap-4">
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/catalogos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Catálogos
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Carrinho
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleWhatsAppClick}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Fale Conosco
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos?cat=baldes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Baldes
                </Link>
              </li>
              <li>
                <Link to="/produtos?cat=organizadores" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Organizadores
                </Link>
              </li>
              <li>
                <Link to="/produtos?cat=lixeiras" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Lixeiras
                </Link>
              </li>
              <li>
                <Link to="/produtos?cat=cozinha" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cozinha
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-primary" />
                  WhatsApp: {formatWhatsAppDisplay(whatsappNumber)}
                </button>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                antoniohimmer@gmail.com
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                Rua Antônio Lourenço Rosa, 180<br />
                Canoas - RS
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Rodilar. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
