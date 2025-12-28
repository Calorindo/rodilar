import { Link } from 'react-router-dom';
import { Package, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
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
                Plásticos<span className="text-primary">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Há mais de 20 anos oferecendo os melhores produtos plásticos para sua casa e empresa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
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
                <Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Carrinho
                </Link>
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
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                (51) 3333-4444
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                contato@plasticospro.com.br
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                Rua dos Plásticos, 123<br />
                Porto Alegre - RS
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 PlásticosPro. Todos os direitos reservados.
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
