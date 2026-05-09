import { Shield, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export default function Warranty() {
  const { language } = useStore();

  const periods = language === 'id' ? [
    { product: 'Processor & Graphics Card', period: '3 Tahun' },
    { product: 'Motherboard', period: '3 Tahun' },
    { product: 'RAM & Storage', period: 'Seumur Hidup / 5 Tahun' },
    { product: 'Laptop', period: '1-2 Tahun' },
    { product: 'Monitor', period: '3 Tahun' },
    { product: 'Audio & Accessories', period: '1 Tahun' },
  ] : [
    { product: 'Processor & Graphics Card', period: '3 Years' },
    { product: 'Motherboard', period: '3 Years' },
    { product: 'RAM & Storage', period: 'Lifetime / 5 Years' },
    { product: 'Laptop', period: '1-2 Years' },
    { product: 'Monitor', period: '3 Years' },
    { product: 'Audio & Accessories', period: '1 Year' },
  ];

  const covered = language === 'id' ? [
    'Kerusakan material dan workmanship',
    'Kegagalan fungsi hardware',
    'Defect pabrikasi',
    'Kerusakan akibat penggunaan normal',
  ] : [
    'Material and workmanship defects',
    'Hardware functionality failure',
    'Manufacturing defects',
    'Damage from normal use',
  ];

  const notCovered = language === 'id' ? [
    'Kerusakan akibat kelalaian pengguna',
    'Kerusakan fisik (jatuh, benturan, air)',
    'Modifikasi tidak resmi',
    'Penggunaan tidak sesuai spesifikasi',
  ] : [
    'Damage from user negligence',
    'Physical damage (drops, impacts, water)',
    'Unauthorized modifications',
    'Use outside specifications',
  ];

  const steps = language === 'id' ? [
    { title: 'Hubungi Layanan Pelanggan', desc: 'Hubungi kami melalui email atau telepon dengan nomor pesanan Anda.' },
    { title: 'Verifikasi Kerusakan', desc: 'Tim teknis kami akan memverifikasi keluhan dan memberikan instruksi.' },
    { title: 'Kirim Produk', desc: 'Kirim produk ke alamat service center yang diberikan.' },
    { title: 'Perbaikan/Penggantian', desc: 'Produk akan diperbaiki atau diganti sesuai kebijakan garansi.' },
  ] : [
    { title: 'Contact Customer Service', desc: 'Reach us via email or phone with your order number.' },
    { title: 'Verify Damage', desc: 'Our technical team will verify the complaint and provide instructions.' },
    { title: 'Send Product', desc: 'Ship the product to the provided service center address.' },
    { title: 'Repair/Replacement', desc: 'Product will be repaired or replaced according to warranty policy.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === 'id' ? 'Kebijakan Garansi' : 'Warranty Policy'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {language === 'id' ? 'Informasi lengkap mengenai garansi produk kami' : 'Complete information about our product warranty'}
        </p>

        {/* Periods */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {language === 'id' ? 'Masa Garansi' : 'Warranty Period'}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {periods.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{item.product}</span>
              </div>
              <span className="text-sm font-semibold text-primary">{item.period}</span>
            </div>
          ))}
        </div>

        {/* What is Covered */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="text-sm font-semibold text-foreground">
                {language === 'id' ? 'Apa yang Dicakup' : 'What is Covered'}
              </h3>
            </div>
            <ul className="space-y-2">
              {covered.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-red-600" />
              <h3 className="text-sm font-semibold text-foreground">
                {language === 'id' ? 'Tidak Dicakup' : 'Not Covered'}
              </h3>
            </div>
            <ul className="space-y-2">
              {notCovered.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How to Claim */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {language === 'id' ? 'Cara Klaim Garansi' : 'How to Claim Warranty'}
        </h2>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Required Documents */}
        <div className="mt-10 p-5 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {language === 'id' ? 'Dokumen yang Diperlukan' : 'Required Documents'}
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- {language === 'id' ? 'Invoice pembelian asli' : 'Original purchase invoice'}</li>
                <li>- {language === 'id' ? 'Kartu garansi (jika ada)' : 'Warranty card (if available)'}</li>
                <li>- {language === 'id' ? 'Produk dalam kondisi lengkap' : 'Product in complete condition'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
