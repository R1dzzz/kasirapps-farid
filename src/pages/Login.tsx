import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid3X3, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { t, language } = useStore();
  const { isLoggedIn, login, register, loginWithGoogle } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (isRegister && !name.trim()) newErrors.name = language === 'id' ? 'Nama wajib diisi' : 'Name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = language === 'id' ? 'Email tidak valid' : 'Invalid email';
    if (!password || password.length < 6) newErrors.password = language === 'id' ? 'Kata sandi minimal 6 karakter' : 'Password must be at least 6 characters';
    if (isRegister && password !== confirmPassword) newErrors.confirmPassword = language === 'id' ? 'Kata sandi tidak cocok' : 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      if (isRegister) {
        const success = await register(email, password, name);
        if (success) setIsRegister(false);
      } else {
        const success = await login(email, password);
        if (success) navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Banner (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col items-center justify-center text-primary-foreground p-12">
        <Grid3X3 className="h-16 w-16 mb-6" />
        <h2 className="text-3xl font-bold mb-3">KasirApps</h2>
        <p className="text-center text-primary-foreground/80 max-w-sm">
          {language === 'id'
            ? 'Platform e-commerce terpercaya untuk semua kebutuhan elektronik Anda.'
            : 'A trusted e-commerce platform for all your electronics needs.'}
        </p>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Grid3X3 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">KasirApps</span>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
            {/* Tabs */}
            <div className="flex mb-6 border-b border-border">
              <button
                onClick={() => { setIsRegister(false); setErrors({}); }}
                className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  !isRegister ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('login')}
              </button>
              <button
                onClick={() => { setIsRegister(true); setErrors({}); }}
                className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  isRegister ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('register')}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('name')}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={language === 'id' ? 'Nama lengkap' : 'Full name'}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.name ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('email')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.email ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="******"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-lg border ${errors.password ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
              </div>

              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t('confirmPassword')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="******"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.confirmPassword ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {!isRegister && (
                <div className="text-right">
                  <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer">
                    {t('forgotPassword')}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {loading
                  ? (language === 'id' ? 'Memuat...' : 'Loading...')
                  : (isRegister ? t('register') : t('login'))
                }
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">{t('or')}</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-background font-medium text-sm hover:bg-muted transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {t('signInWithGoogle')}
            </button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {isRegister ? t('alreadyHaveAccount') : t('dontHaveAccount')}{' '}
              <button
                onClick={() => { setIsRegister(!isRegister); setErrors({}); }}
                className="text-primary hover:underline font-medium"
              >
                {isRegister ? t('login') : t('register')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
