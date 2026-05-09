import { Link } from 'react-router-dom';
import { Grid3X3, Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';
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

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('contact')}</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                support@kasirapps.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +62 812-3456-7890
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground">
                <Facebook className="h-4 w-4" />
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
