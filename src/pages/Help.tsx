import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react';
import { useStore } from '@/stores/useStore';

interface FAQItem {
  question: string;
  questionId: string;
  answer: string;
}

export default function Help() {
  const { language } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = language === 'id' ? [
    { question: 'Bagaimana cara memesan produk?', questionId: 'cara-belanja', answer: 'Anda dapat memesan produk dengan mencari produk yang diinginkan, menambahkannya ke keranjang, lalu melanjutkan ke checkout. Isi informasi pengiriman dan pilih metode pembayaran yang Anda inginkan.' },
    { question: 'Metode pembayaran apa saja yang tersedia?', questionId: 'pembayaran', answer: 'Kami menerima pembayaran melalui Transfer Bank, Kartu Kredit, dan COD (Bayar di Tempat). Semua transaksi dilakukan secara simulasi dan tidak melibatkan uang sungguhan.' },
    { question: 'Berapa lama waktu pengiriman?', questionId: 'pengiriman', answer: 'Waktu pengiriman biasanya 1-3 hari kerja untuk area Jabodetabek dan 3-7 hari kerja untuk luar kota. Pengiriman gratis untuk semua pesanan.' },
    { question: 'Bagaimana cara melacak pesanan saya?', questionId: 'lacak', answer: 'Anda dapat melacak pesanan melalui halaman Riwayat Transaksi di dashboard akun Anda. Setiap pesanan memiliki nomor pesanan unik.' },
    { question: 'Apakah ada garansi untuk produk?', questionId: 'garansi', answer: 'Ya, semua produk elektronik bergaransi resmi dari distributor. Masa garansi bervariasi tergantung jenis produk, mulai dari 1 hingga 3 tahun.' },
    { question: 'Bagaimana cara mengembalikan produk?', questionId: 'return', answer: 'Produk dapat dikembalikan dalam waktu 7 hari sejak diterima jika ada kerusakan atau tidak sesuai pesanan. Hubungi layanan pelanggan kami untuk memulai proses pengembalian.' },
    { question: 'Bagaimana cara membuat akun?', questionId: 'akun', answer: 'Klik tombol "Daftar" di pojok kanan atas, isi formulir pendaftaran dengan nama, email, dan kata sandi Anda. Akun akan segera aktif setelah pendaftaran.' },
    { question: 'Apakah data saya aman?', questionId: 'keamanan', answer: 'Keamanan data Anda adalah prioritas kami. Kami menggunakan enkripsi SSL dan tidak menyimpan informasi sensitif di server kami.' },
  ] : [
    { question: 'How do I place an order?', questionId: 'how-to-shop', answer: 'You can order products by searching for the desired item, adding it to your cart, then proceeding to checkout. Fill in your shipping information and select your preferred payment method.' },
    { question: 'What payment methods are available?', questionId: 'payment', answer: 'We accept Bank Transfer, Credit Card, and COD (Cash on Delivery). All transactions are simulated and do not involve real money.' },
    { question: 'How long does delivery take?', questionId: 'shipping', answer: 'Delivery typically takes 1-3 business days for Jabodetabek area and 3-7 business days for outside the city. Free shipping for all orders.' },
    { question: 'How do I track my order?', questionId: 'tracking', answer: 'You can track orders through the Transaction History page in your account dashboard. Each order has a unique order number.' },
    { question: 'Is there a warranty for products?', questionId: 'warranty', answer: 'Yes, all electronic products come with an official warranty from the distributor. Warranty period varies depending on product type, from 1 to 3 years.' },
    { question: 'How do I return a product?', questionId: 'return', answer: 'Products can be returned within 7 days of receipt if there is damage or the item does not match the order. Contact our customer service to start the return process.' },
    { question: 'How do I create an account?', questionId: 'account', answer: 'Click the "Register" button in the top right corner, fill in the registration form with your name, email, and password. Your account will be active immediately after registration.' },
    { question: 'Is my data secure?', questionId: 'security', answer: 'Your data security is our priority. We use SSL encryption and do not store sensitive information on our servers.' },
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === 'id' ? 'Pusat Bantuan' : 'Help Center'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {language === 'id' ? 'Temukan jawaban untuk pertanyaan umum Anda' : 'Find answers to your common questions'}
        </p>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={language === 'id' ? 'Cari topik bantuan...' : 'Search help topics...'}
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2 mb-12">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{faq.question}</span>
                {openIndex === i ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Cards */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: MessageCircle, title: 'Live Chat', desc: '09:00 - 21:00 WIB' },
            { icon: Phone, title: '+62 812-3456-7890', desc: '09:00 - 18:00 WIB' },
            { icon: Mail, title: 'support@kasirapps.com', desc: '24/7 Response' },
          ].map((contact, i) => (
            <div key={i} className="flex flex-col items-center text-center p-5 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <contact.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{contact.title}</p>
              <p className="text-xs text-muted-foreground">{contact.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
