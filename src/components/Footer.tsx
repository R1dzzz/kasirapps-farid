import { Link } from 'react-router-dom';
import { Mail, Phone, Github, MessageCircle } from "lucide-react";
import { useStore } from '@/stores/useStore';

export function Footer() {
  const { t, language } = useStore();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Grid3X3 className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-foreground">KasirApps</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'id'
                ? 'Solusi terbaik untuk bisnis elektronik Anda. Platform e-commerce lengkap dengan produk berkualitas.'
                : 'The best solution for your electronics business. Complete e-commerce platform with quality products.'}
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('menu')}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('categories')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('help')}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('helpCenter')}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('shippingInfo2')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('returns')}
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('warranty')}
                </Link>
              </li>
              <li>
                <Link to="/customer-center" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t('customerCenter')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}<div>
  <h3 className="text-sm font-semibold text-foreground mb-4">{t('contact')}</h3>

  <ul className="space-y-2.5">
    <li className="flex items-center gap-2 text-sm text-muted-foreground">
      <Mail className="h-4 w-4" />
      <a
        href="mailto:gorid772@gmail.com"
        className="hover:text-foreground transition-colors"
      >
        gorid772@gmail.com
      </a>
    </li>

    <li className="flex items-center gap-2 text-sm text-muted-foreground">
      <Phone className="h-4 w-4" />
      <a
        href="tel:+6282331040487"
        className="hover:text-foreground transition-colors"
      >
        +62 823-3104-0487
      </a>
    </li>
  </ul>

  <div className="flex items-center gap-3 mt-4">
    <a
      href="https://github.com/R1dzzz"
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
      aria-label="GitHub"
    >
      <Github className="h-4 w-4" />
    </a>

    <a
      href="https://x.com/Blitch03"
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
      aria-label="X"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
      >
        <path d="M18.244 2H21.5l-7.12 8.136L22 22h-5.956l-4.664-6.104L5.98 22H2.72l7.62-8.707L2 2h6.106l4.216 5.54L18.244 2zm-1.044 18h1.802L7.05 3.894H5.144L17.2 20z" />
      </svg>
    </a>

    <a
      href="https://wa.me/6282331040487?text=Halo%20Farid,%20saya%20tertarik%20dengan%20KasirApps."
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
      aria-label="WhatsApp"
    >
                  <MessageCircle className="h-4 w-4" />
                </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            &copy; 2025 KasirApps. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
