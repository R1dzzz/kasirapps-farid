import { Truck, MapPin, CheckCircle } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export default function Shipping() {
  const { language } = useStore();

  const methods = language === 'id' ? [
    { name: 'Reguler', time: '3-5 hari kerja', price: 'Gratis', min: 'Min. pembelian Rp100.000' },
    { name: 'Express', time: '1-2 hari kerja', price: 'Rp15.000', min: 'Untuk semua pesanan' },
    { name: 'Same Day', time: 'Dalam hari yang sama', price: 'Rp35.000', min: 'Khusus Jabodetabek' },
    { name: 'Pickup', time: 'Sesuai jadwal', price: 'Gratis', min: 'Ambil di toko' },
  ] : [
    { name: 'Regular', time: '3-5 business days', price: 'Free', min: 'Min. purchase IDR 100K' },
    { name: 'Express', time: '1-2 business days', price: 'IDR 15K', min: 'For all orders' },
    { name: 'Same Day', time: 'Same day delivery', price: 'IDR 35K', min: 'Jabodetabek only' },
    { name: 'Pickup', time: 'By schedule', price: 'Free', min: 'Pick up at store' },
  ];

  const steps = language === 'id' ? [
    { title: 'Pesanan Diterima', desc: 'Pesanan Anda telah dikonfirmasi dan sedang diproses.' },
    { title: 'Pengemasan', desc: 'Produk sedang dikemas dengan aman oleh tim kami.' },
    { title: 'Dikirim', desc: 'Pesanan telah dikirim melalui kurir yang Anda pilih.' },
    { title: 'Tiba di Tujuan', desc: 'Pesanan tiba di alamat pengiriman Anda.' },
  ] : [
    { title: 'Order Received', desc: 'Your order has been confirmed and is being processed.' },
    { title: 'Packing', desc: 'The product is being safely packed by our team.' },
    { title: 'Shipped', desc: 'The order has been shipped via your chosen courier.' },
    { title: 'Arrived', desc: 'Order arrives at your shipping address.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === 'id' ? 'Informasi Pengiriman' : 'Shipping Information'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {language === 'id' ? 'Pilihan pengiriman dan estimasi waktu pengiriman' : 'Shipping options and delivery time estimates'}
        </p>

        {/* Methods */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {methods.map((m, i) => (
            <div key={i} className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.time}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{m.min}</span>
                <span className="font-semibold text-primary">{m.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Steps */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {language === 'id' ? 'Proses Pengiriman' : 'Shipping Process'}
        </h2>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coverage */}
        <h2 className="text-xl font-bold text-foreground mb-4 mt-10">
          {language === 'id' ? 'Area Jangkauan' : 'Coverage Area'}
        </h2>
        <div className="p-5 rounded-xl bg-card border border-border">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground">
                {language === 'id'
                  ? 'Kami mengirim ke seluruh wilayah Indonesia termasuk Jawa, Sumatera, Kalimantan, Sulawesi, Bali, dan Papua. Pengiriman internasional tersedia untuk negara-negara tertentu di Asia Tenggara.'
                  : 'We ship to all regions of Indonesia including Java, Sumatra, Kalimantan, Sulawesi, Bali, and Papua. International shipping is available for certain Southeast Asian countries.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
