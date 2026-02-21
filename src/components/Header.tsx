import { ShoppingCart, Menu, X, Package, Lock, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { settingsService } from '@/services/settingsService';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('5551992155747');
  const { totalItems } = useCart();
  const { user, hasAccess } = useAuth();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/catalogos', label: 'Catálogos' },
  ];

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
            <Package className="h-6 w-6" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Rodilar<span className="text-primary"></span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-medium transition-colors hover:text-primary ${
                location.pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleWhatsAppClick}
            className="font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Contato
          </button>
        </nav>

        <div className="flex items-center gap-4">
          {user && hasAccess && (
            <Link to="/admin">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                <Lock className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          )}
          
          <Link to="/carrinho">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border animate-slide-in-right">
          <nav className="container flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors hover:text-primary py-2 ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                handleWhatsAppClick();
                setIsMenuOpen(false);
              }}
              className="font-medium text-muted-foreground transition-colors hover:text-primary py-2 flex items-center gap-2 text-left"
            >
              <MessageCircle className="h-4 w-4" />
              Contato
            </button>
            {user && hasAccess && (
              <Link
                to="/admin"
                className="font-medium transition-colors hover:text-primary py-2 text-muted-foreground flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Lock className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
