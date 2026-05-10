import { Link } from 'react-router-dom';
import { Headphones, MessageSquare, FileQuestion, Truck, Shield, RotateCcw, Mail, Phone, Clock } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export default function CustomerCenter() {
  const { language } = useStore();

  const services = [
    { icon: FileQuestion, title: language === 'id' ? 'Pusat Bantuan' : 'Help Center', desc: language === 'id' ? 'Temukan jawaban untuk pertanyaan umum' : 'Find answers to common questions', link: '/help' },
    { icon: Truck, title: language === 'id' ? 'Info Pengiriman' : 'Shipping Info', desc: language === 'id' ? 'Metode dan estimasi pengiriman' : 'Shipping methods and estimates', link: '/shipping' },
    { icon: Shield, title: language === 'id' ? 'Kebijakan Garansi' : 'Warranty Policy', desc: language === 'id' ? 'Informasi garansi produk' : 'Product warranty information', link: '/warranty' },
    { icon: RotateCcw, title: language === 'id' ? 'Pengembalian' : 'Returns', desc: language === 'id' ? 'Syarat dan proses pengembalian' : 'Return terms and process', link: '/returns' },
  ];

  const contactMethods = [
    { icon: Phone, label: '+62 823-3104-0487', desc: language === 'id' ? 'Senin - Jumat, 09:00 - 18:00' : 'Mon - Fri, 09:00 - 18:00' },
    { icon: Mail, label: 'gorid772@gmail.com', desc: language === 'id' ? 'Respons dalam 24 jam' : 'Response within 24 hours' },
    { icon: MessageSquare, label: language === 'id' ? 'Live Chat' : 'Live Chat', desc: language === 'id' ? 'Senin - Minggu, 09:00 - 21:00' : 'Mon - Sun, 09:00 - 21:00' },
    { icon: Clock, label: language === 'id' ? 'Jam Layanan' : 'Service Hours', desc: language === 'id' ? '09:00 - 21:00 WIB setiap hari' : '09:00 - 21:00 WIB daily' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === 'id' ? 'Pusat Pelanggan' : 'Customer Center'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {language === 'id' ? 'Kami siap membantu Anda dengan segala kebutuhan' : 'We are ready to help you with all your needs'}
        </p>

        {/* Hero Banner */}
        <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10 mb-10 text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Headphones className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {language === 'id' ? 'Butuh Bantuan?' : 'Need Help?'}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {language === 'id'
              ? 'Tim dukungan kami tersedia setiap hari untuk membantu Anda dengan pertanyaan, keluhan, atau masalah teknis.'
              : 'Our support team is available every day to help you with questions, complaints, or technical issues.'}
          </p>
        </div>

        {/* Service Links */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {language === 'id' ? 'Layanan Kami' : 'Our Services'}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {services.map((s, i) => (
            <Link
              key={i}
              to={s.link}
              className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-md hover:border-primary transition-all group"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Methods */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {contactMethods.map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Contact Form */}
        <div className="mt-10 p-6 rounded-xl bg-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {language === 'id' ? 'Kirim Pesan' : 'Send a Message'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={language === 'id' ? 'Nama Anda' : 'Your Name'}
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <textarea
            rows={4}
            placeholder={language === 'id' ? 'Pesan Anda...' : 'Your message...'}
            className="w-full mt-4 px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <button className="mt-4 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            {language === 'id' ? 'Kirim Pesan' : 'Send Message'}
          </button>
        </div>
      </div>
    </div>
  );
}
