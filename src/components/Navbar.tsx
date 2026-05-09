import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search, ShoppingCart, Heart, Sun, Moon, Menu, X,
  ChevronRight, Grid3X3
} from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { SearchOverlay } from './SearchOverlay';

export function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme, language, toggleLanguage, t } = useStore();
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/products', label: t('products') },
    { to: '/categories', label: t('categories') },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-200 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-background'
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Grid3X3 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">KasirApps</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors hidden sm:block"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {language.toUpperCase()}
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t('login')}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-background shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold">KasirApps</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            {isLoggedIn && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted mb-4">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            )}

            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center justify-between p-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
              <Link to="/wishlist" className="flex items-center justify-between p-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                {t('wishlist')}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link to="/cart" className="flex items-center justify-between p-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                {t('cart')}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/dashboard" className="flex items-center justify-between p-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                    {t('dashboard')}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link to="/transactions" className="flex items-center justify-between p-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                    {t('transactions')}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </>
              )}
            </div>

            <div className="border-t border-border pt-4 space-y-1">
              <Link to="/help" className="flex items-center justify-between p-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                {t('helpCenter')}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>

              <div className="flex items-center justify-between p-3">
                <span className="text-sm text-muted-foreground">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-muted"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3">
                <span className="text-sm text-muted-foreground">Language</span>
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground"
                >
                  {language.toUpperCase()}
                </button>
              </div>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              {isLoggedIn ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="w-full p-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
                >
                  {t('logout')}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block w-full p-3 rounded-lg text-sm font-medium text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
