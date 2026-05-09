import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, CreditCard, Truck } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useCart } from '@/hooks/useCart';
import { useTransactions } from '@/hooks/useTransactions';

type PaymentMethod = 'transfer' | 'credit_card' | 'cod';

export default function Checkout() {
  const { t, language } = useStore();
  const { items, totalPrice, clear } = useCart();
  const { createTransaction } = useTransactions();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('transfer');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(price);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = language === 'id' ? 'Nama wajib diisi' : 'Name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = language === 'id' ? 'Email tidak valid' : 'Invalid email';
    if (!phone.trim()) newErrors.phone = language === 'id' ? 'Nomor telepon wajib diisi' : 'Phone is required';
    if (!address.trim()) newErrors.address = language === 'id' ? 'Alamat wajib diisi' : 'Address is required';
    if (!city.trim()) newErrors.city = language === 'id' ? 'Kota wajib diisi' : 'City is required';
    if (!postalCode.trim()) newErrors.postalCode = language === 'id' ? 'Kode pos wajib diisi' : 'Postal code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tx = createTransaction({
      items: items.map(item => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total_amount: totalPrice,
      shipping_info: { name, email, phone, address, city, postal_code: postalCode },
      payment_method: paymentMethod,
    });

    setOrderNumber(tx.order_number);
    clear();
    setSuccess(true);
  };

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center">
        <Package className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">{t('emptyCart')}</h2>
        <Link to="/products" className="mt-4 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('orderSuccess')}</h2>
        <p className="text-muted-foreground mb-1">
          {t('orderNumber')}: <span className="font-semibold text-foreground">{orderNumber}</span>
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          {language === 'id'
            ? 'Pesanan Anda sedang diproses. Terima kasih telah berbelanja!'
            : 'Your order is being processed. Thank you for shopping!'}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/transactions"
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            {t('viewOrders')}
          </Link>
          <Link
            to="/products"
            className="px-6 py-2.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
          >
            {t('backToShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{t('checkout')}</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-5">{t('shippingInfo')}</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('fullName')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('email')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('phone')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('city')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.city ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('address')} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.address ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                  />
                  {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t('postalCode')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.postalCode ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.postalCode && <p className="text-xs text-destructive mt-1">{errors.postalCode}</p>}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">{t('paymentMethod')}</h3>
                <div className="space-y-2">
                  {[
                    { value: 'transfer' as PaymentMethod, label: t('bankTransfer'), icon: CreditCard },
                    { value: 'credit_card' as PaymentMethod, label: t('creditCard'), icon: CreditCard },
                    { value: 'cod' as PaymentMethod, label: t('cod'), icon: Truck },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        paymentMethod === method.value ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                        className="sr-only"
                      />
                      <method.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{method.label}</span>
                      {paymentMethod === method.value && (
                        <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-xl bg-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">{t('orderSummary')}</h2>

              <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
                {items.map(item => (
                  <div key={item.product_id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.quantity}x</p>
                    </div>
                    <span className="text-xs font-medium text-foreground">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-3 space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('subtotal')}</span>
                  <span className="font-medium text-foreground">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('shipping')}</span>
                  <span className="font-medium text-green-600">{t('free')}</span>
                </div>
              </div>

              <div className="border-t border-border pt-3 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{t('total')}</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                {t('placeOrder')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
