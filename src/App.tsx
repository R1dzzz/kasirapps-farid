import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Categories from '@/pages/Categories';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Transactions from '@/pages/Transactions';
import Wishlist from '@/pages/Wishlist';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Help from '@/pages/Help';
import Shipping from '@/pages/Shipping';
import Warranty from '@/pages/Warranty';
import Returns from '@/pages/Returns';
import CustomerCenter from '@/pages/CustomerCenter';
import { useStore } from '@/stores/useStore';
import { useEffect } from 'react';

function App() {
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Toast />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Help />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/customer-center" element={<CustomerCenter />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
