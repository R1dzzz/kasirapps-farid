import { RotateCcw, CheckCircle, XCircle, Clock, Package, Truck } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export default function Returns() {
  const { language } = useStore();

  const conditions = language === 'id' ? [
    'Produk belum digunakan dan dalam kondisi asli',
    'Semua aksesoris dan kemasan asli lengkap',
    'Pengajuan pengembalian dalam 7 hari sejak diterima',
    'Memiliki invoice pembelian yang valid',
  ] : [
    'Product is unused and in original condition',
    'All original accessories and packaging are complete',
    'Return request within 7 days of receipt',
    'Valid purchase invoice is available',
  ];

  const steps = language === 'id' ? [
    { icon: RotateCcw, title: 'Ajukan Pengembalian', desc: 'Hubungi layanan pelanggan dengan nomor pesanan dan alasan pengembalian.' },
    { icon: CheckCircle, title: 'Verifikasi', desc: 'Tim kami akan memverifikasi kelayakan pengembalian dalam 1-2 hari kerja.' },
    { icon: Package, title: 'Kemas & Kirim', desc: 'Kemas produk dengan aman dan kirim ke alamat yang diberikan.' },
    { icon: Truck, title: 'Pengembalian Dana', desc: 'Dana akan dikembalikan dalam 3-5 hari kerja setelah produk diterima.' },
  ] : [
    { icon: RotateCcw, title: 'Submit Return', desc: 'Contact customer service with order number and return reason.' },
    { icon: CheckCircle, title: 'Verification', desc: 'Our team will verify return eligibility within 1-2 business days.' },
    { icon: Package, title: 'Pack & Ship', desc: 'Pack the product safely and ship to the provided address.' },
    { icon: Truck, title: 'Refund', desc: 'Refund will be processed within 3-5 business days after product is received.' },
  ];

  const nonReturnable = language === 'id' ? [
    'Produk software yang sudah diaktifkan',
    'Produk yang sudah digunakan atau rusak oleh pengguna',
    'Aksesoris personal (headset, earphone) yang sudah dipakai',
    'Produk custom atau pre-order khusus',
  ] : [
    'Software products that have been activated',
    'Products that have been used or damaged by user',
    'Personal accessories (headsets, earphones) that have been worn',
    'Custom or special pre-order products',
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === 'id' ? 'Kebijakan Pengembalian' : 'Return Policy'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {language === 'id' ? 'Ketentuan dan proses pengembalian produk' : 'Terms and process for returning products'}
        </p>

        {/* Period */}
        <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              {language === 'id' ? 'Masa Pengembalian: 7 Hari' : 'Return Period: 7 Days'}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {language === 'id'
              ? 'Anda dapat mengajukan pengembalian dalam waktu 7 hari kalender sejak produk diterima. Produk harus dalam kondisi asli, belum digunakan, dan lengkap dengan kemasan serta aksesori.'
              : 'You can submit a return within 7 calendar days of receiving the product. The product must be in original condition, unused, and complete with packaging and accessories.'}
          </p>
        </div>

        {/* Conditions */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {language === 'id' ? 'Syarat Pengembalian' : 'Return Conditions'}
        </h2>
        <div className="space-y-2 mb-8">
          {conditions.map((c, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{c}</span>
            </div>
          ))}
        </div>

        {/* Process */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {language === 'id' ? 'Proses Pengembalian' : 'Return Process'}
        </h2>
        <div className="space-y-3 mb-8">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <step.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Non-returnable */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {language === 'id' ? 'Produk yang Tidak Dapat Dikembalikan' : 'Non-Returnable Items'}
        </h2>
        <div className="space-y-2">
          {nonReturnable.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
              <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
