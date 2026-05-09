import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/stores/useStore';

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast, language } = useStore();

  const isLoggedIn = !!user;

  useEffect(() => {
    // Check initial session
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      showToast(error.message, 'error');
      return false;
    }
    if (data.user) {
      showToast(language === 'id' ? 'Berhasil masuk' : 'Logged in successfully');
      return true;
    }
    return false;
  }, [showToast, language]);

  const register = useCallback(async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      showToast(error.message, 'error');
      return false;
    }
    if (data.user) {
      showToast(language === 'id' ? 'Akun berhasil dibuat' : 'Account created successfully');
      return true;
    }
    return false;
  }, [showToast, language]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    showToast(language === 'id' ? 'Berhasil keluar' : 'Logged out successfully');
  }, [showToast, language]);

  return { user, loading, isLoggedIn, login, register, logout };
}
