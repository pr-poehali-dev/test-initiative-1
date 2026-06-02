import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/57cfe8af-6b72-4719-882e-a3de3e5cc7e2/files/db72a135-b211-48e5-bcdd-bcac89756264.jpg";
const PRODUCTS_IMAGE = "https://cdn.poehali.dev/projects/57cfe8af-6b72-4719-882e-a3de3e5cc7e2/files/7ab6ec06-c471-434a-82c2-56d595b58b37.jpg";
const LIFESTYLE_IMAGE = "https://cdn.poehali.dev/projects/57cfe8af-6b72-4719-882e-a3de3e5cc7e2/files/41446af3-8a79-490f-aaf3-72b4f4e64535.jpg";

type Section = "home" | "catalog" | "about" | "cart" | "reviews" | "blog" | "contacts";

const PRODUCTS = [
  { id: 1, name: "AirPods Ultra X", price: 12990, oldPrice: 17990, category: "Техника", rating: 4.9, reviews: 234, badge: "ХИТ", color: "#FF2D9B" },
  { id: 2, name: "Smart Watch Pro", price: 24990, oldPrice: null, category: "Часы", rating: 4.7, reviews: 89, badge: "НОВИНКА", color: "#00FFE0" },
  { id: 3, name: "Сумка Minimal", price: 8490, oldPrice: 11990, category: "Аксессуары", rating: 4.8, reviews: 156, badge: "-29%", color: "#FFE500" },
  { id: 4, name: "Кроссовки Neo", price: 15990, oldPrice: null, category: "Обувь", rating: 4.6, reviews: 312, badge: "ТОП", color: "#9D00FF" },
  { id: 5, name: "Куртка Future", price: 19990, oldPrice: 28000, category: "Одежда", rating: 4.9, reviews: 67, badge: "-29%", color: "#FF2D9B" },
  { id: 6, name: "Рюкзак Urban", price: 6990, oldPrice: null, category: "Аксессуары", rating: 4.5, reviews: 198, badge: "POPULAR", color: "#00FFE0" },
  { id: 7, name: "Очки Cyber", price: 4990, oldPrice: 6990, category: "Аксессуары", rating: 4.7, reviews: 445, badge: "-28%", color: "#FFE500" },
  { id: 8, name: "Bluetooth Speaker", price: 9990, oldPrice: null, category: "Техника", rating: 4.8, reviews: 123, badge: "НОВИНКА", color: "#9D00FF" },
];

const SEARCH_SUGGESTIONS = [
  "AirPods", "Smart Watch", "Кроссовки", "Куртка", "Рюкзак",
  "Наушники беспроводные", "Часы спортивные", "Очки солнечные",
  "Сумка кожаная", "Bluetooth колонка",
];

const CATEGORIES = ["Все", "Техника", "Часы", "Аксессуары", "Обувь", "Одежда"];

const REVIEWS = [
  { id: 1, name: "Александра М.", text: "Качество товаров просто отличное! Заказываю уже третий раз, всегда всё приходит вовремя и упаковано аккуратно.", rating: 5, date: "2 дня назад", product: "AirPods Ultra X" },
  { id: 2, name: "Дмитрий К.", text: "Быстрая доставка, отличная упаковка. Smart Watch работает идеально, всё как описано. Рекомендую магазин!", rating: 5, date: "5 дней назад", product: "Smart Watch Pro" },
  { id: 3, name: "Ольга В.", text: "Кроссовки пришли быстро, сидят идеально. Дизайн именно такой как на фото. Очень довольна покупкой!", rating: 4, date: "1 неделя назад", product: "Кроссовки Neo" },
  { id: 4, name: "Максим Л.", text: "Отличный магазин с широким ассортиментом. Поддержка отвечает быстро, помогли с подбором размера.", rating: 5, date: "2 недели назад", product: "Куртка Future" },
  { id: 5, name: "Екатерина П.", text: "Заказывала сумку — пришла в идеальном состоянии. Кожа мягкая, швы ровные. Уже взяла вторую!", rating: 5, date: "3 недели назад", product: "Сумка Minimal" },
];

const BLOG_POSTS = [
  { id: 1, title: "Тренды 2025: что носить этим летом", tag: "Мода", date: "28 мая", readTime: "3 мин", color: "#FF2D9B" },
  { id: 2, title: "Топ-10 гаджетов для умного дома", tag: "Техника", date: "25 мая", readTime: "5 мин", color: "#00FFE0" },
  { id: 3, title: "Как выбрать идеальные наушники", tag: "Гайд", date: "20 мая", readTime: "4 мин", color: "#FFE500" },
];

function ProductCard({ product, onAddToCart, isAdded, delay }: {
  product: typeof PRODUCTS[0];
  onAddToCart: (id: number) => void;
  isAdded: boolean;
  delay: number;
}) {
  return (
    <div
      className="bg-[#111] border border-[#1E1E1E] rounded-2xl overflow-hidden card-hover group animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="aspect-square relative overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${product.color}15, #0A0A0A)` }}>
        <div className="text-5xl group-hover:scale-110 transition-transform duration-500">🛍️</div>
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-display font-bold" style={{ background: product.color, color: '#000' }}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="text-[#555] text-[10px] font-body uppercase tracking-wider mb-1">{product.category}</div>
        <h3 className="font-body font-semibold text-sm text-white mb-2 leading-tight">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-[#FFE500] text-xs">★</span>
          <span className="text-[#888] text-xs font-body">{product.rating}</span>
          <span className="text-[#333] text-xs font-body">({product.reviews})</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-display font-bold text-base text-white">{product.price.toLocaleString()} ₽</div>
            {product.oldPrice && (
              <div className="text-[#444] text-xs font-body line-through">{product.oldPrice.toLocaleString()} ₽</div>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product.id)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              isAdded ? "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]" : "btn-neon"
            }`}
          >
            <Icon name={isAdded ? "Check" : "Plus"} size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2D9B] to-[#9D00FF] flex items-center justify-center font-display font-bold text-sm">
            {review.name[0]}
          </div>
          <div>
            <div className="font-body font-semibold text-sm text-white">{review.name}</div>
            <div className="text-[#444] text-xs font-body">{review.date}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(review.rating)].map((_, i) => (
            <span key={i} className="text-[#FFE500] text-sm">★</span>
          ))}
        </div>
      </div>
      <p className="text-[#888] text-sm font-body leading-relaxed mb-3">{review.text}</p>
      <div className="text-[#333] text-xs font-body border-t border-[#1A1A1A] pt-3">
        Товар: <span style={{ color: '#FF2D9B' }}>{review.product}</span>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = searchQuery.length > 0
    ? SEARCH_SUGGESTIONS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : SEARCH_SUGGESTIONS.slice(0, 5);

  const filteredProducts = PRODUCTS.filter(p =>
    (activeCategory === "Все" || p.category === activeCategory) &&
    (searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddToCart = (id: number) => {
    setCart(prev => [...prev, id]);
    setAddedToCart(id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const idx = prev.indexOf(id);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };

  const cartItems = PRODUCTS.filter(p => cart.includes(p.id));
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price, 0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "catalog", label: "Каталог", icon: "Grid3X3" },
    { id: "about", label: "О нас", icon: "Star" },
    { id: "reviews", label: "Отзывы", icon: "MessageSquare" },
    { id: "blog", label: "Блог", icon: "BookOpen" },
    { id: "contacts", label: "Контакты", icon: "Phone" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <button
            onClick={() => setActiveSection("home")}
            className="font-display font-black text-xl flex-shrink-0 flex items-center gap-1"
          >
            <span className="gradient-text">NOVA</span>
            <span className="text-white">SHOP</span>
          </button>

          {/* Search */}
          <div ref={searchRef} className="flex-1 max-w-xl relative mx-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
              searchFocused ? "border-[#FF2D9B] bg-[#111] shadow-[0_0_20px_rgba(255,45,155,0.2)]" : "border-[#1E1E1E] bg-[#111]"
            }`}>
              <Icon name="Search" size={16} className="text-[#666] flex-shrink-0" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="bg-transparent text-white text-sm outline-none w-full placeholder-[#444] font-body"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-[#666] hover:text-white transition-colors">
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>

            {/* Dropdown */}
            {searchFocused && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl z-50 search-dropdown">
                <div className="p-2 text-[10px] text-[#555] uppercase tracking-widest px-3 pt-3 font-display">
                  {searchQuery ? "Результаты" : "Популярные запросы"}
                </div>
                {filteredSuggestions.map((s, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-3 py-2.5 text-sm text-[#ccc] hover:bg-[#1A1A1A] hover:text-[#FF2D9B] flex items-center gap-3 transition-colors font-body"
                    onClick={() => {
                      setSearchQuery(s);
                      setSearchFocused(false);
                      setActiveSection("catalog");
                    }}
                  >
                    <Icon name="Search" size={14} className="text-[#444]" />
                    <span>{s}</span>
                  </button>
                ))}
                {searchQuery && (
                  <button
                    className="w-full text-left px-3 py-2.5 text-sm font-semibold text-[#FF2D9B] hover:bg-[#1A1A1A] flex items-center gap-3 transition-colors border-t border-[#1E1E1E] font-body"
                    onClick={() => { setActiveSection("catalog"); setSearchFocused(false); }}
                  >
                    <Icon name="ArrowRight" size={14} />
                    Найти «{searchQuery}»
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-[#FF2D9B] text-white"
                    : "text-[#888] hover:text-white hover:bg-[#1A1A1A]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Cart */}
          <button
            onClick={() => setActiveSection("cart")}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-body font-semibold text-sm transition-all ml-auto lg:ml-0 ${
              activeSection === "cart" ? "btn-neon" : "bg-[#1A1A1A] text-white hover:bg-[#222]"
            }`}
          >
            <Icon name="ShoppingCart" size={16} />
            <span className="hidden sm:inline">Корзина</span>
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FF2D9B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            className="lg:hidden text-[#888] hover:text-white ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1E1E1E] bg-[#0A0A0A] px-4 py-3 grid grid-cols-3 gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-xs font-body transition-all ${
                  activeSection === item.id ? "bg-[#FF2D9B] text-white" : "text-[#666] hover:text-white hover:bg-[#1A1A1A]"
                }`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">

        {/* ===== HOME ===== */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden grid-bg">
              <div className="absolute inset-0">
                <img src={HERO_IMAGE} alt="Hero" className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              </div>

              <div className="absolute top-20 right-20 w-80 h-80 bg-[#FF2D9B] rounded-full opacity-10 blur-[100px] animate-float" />
              <div className="absolute bottom-20 right-40 w-60 h-60 bg-[#9D00FF] rounded-full opacity-15 blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-40 right-60 w-40 h-40 bg-[#00FFE0] rounded-full opacity-10 blur-[60px] animate-float" style={{ animationDelay: '1s' }} />

              <div className="relative max-w-7xl mx-auto px-4 py-20">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF2D9B]/30 bg-[#FF2D9B]/10 text-[#FF2D9B] text-xs font-body font-semibold mb-6 animate-pulse-glow">
                    <span className="w-2 h-2 bg-[#FF2D9B] rounded-full animate-pulse" />
                    Новая коллекция 2025
                  </div>

                  <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-none mb-6">
                    <span className="gradient-text">МАГАЗИН</span>
                    <br />
                    <span className="text-white">БУДУЩЕГО</span>
                  </h1>

                  <p className="text-[#888] text-lg font-body mb-8 max-w-md leading-relaxed">
                    Уникальные товары для тех, кто живёт в настоящем. Технологии, мода и стиль в одном месте.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveSection("catalog")} className="btn-neon px-8 py-4 rounded-xl font-display font-bold text-sm tracking-wide">
                      Смотреть каталог
                    </button>
                    <button
                      onClick={() => setActiveSection("about")}
                      className="px-8 py-4 rounded-xl border border-[#333] text-white font-body font-semibold text-sm hover:border-[#FF2D9B] hover:text-[#FF2D9B] transition-all"
                    >
                      О нас
                    </button>
                  </div>

                  <div className="flex gap-8 mt-12">
                    {[
                      { value: "12K+", label: "Клиентов" },
                      { value: "850+", label: "Товаров" },
                      { value: "99%", label: "Довольных" },
                    ].map(stat => (
                      <div key={stat.label}>
                        <div className="font-display font-black text-2xl neon-text-pink">{stat.value}</div>
                        <div className="text-[#555] text-xs font-body mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Marquee */}
            <div className="py-4 border-y border-[#1E1E1E] overflow-hidden bg-[#0F0F0F]">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-8 pr-8">
                    {["НОВИНКИ", "СКИДКИ ДО 40%", "БЕСПЛАТНАЯ ДОСТАВКА", "12 000+ КЛИЕНТОВ", "ГАРАНТИЯ КАЧЕСТВА", "БЫСТРАЯ ДОСТАВКА"].map(text => (
                      <div key={text} className="flex items-center gap-4">
                        <span className="font-display font-bold text-sm text-[#333] uppercase tracking-widest">{text}</span>
                        <span className="text-[#FF2D9B] text-lg">✦</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="text-[#FF2D9B] text-xs font-display font-bold uppercase tracking-widest mb-2">Хиты продаж</div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl">ТОПОВЫЕ ТОВАРЫ</h2>
                </div>
                <button onClick={() => setActiveSection("catalog")} className="text-[#FF2D9B] text-sm font-body font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Все товары <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCTS.slice(0, 4).map((product, i) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} isAdded={addedToCart === product.id} delay={i * 0.1} />
                ))}
              </div>
            </section>

            {/* Banner */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
              <div className="relative rounded-3xl overflow-hidden">
                <img src={PRODUCTS_IMAGE} alt="Sale" className="w-full h-64 sm:h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 to-transparent flex items-center">
                  <div className="p-8 sm:p-12">
                    <div className="text-[#FFE500] text-xs font-display font-bold uppercase tracking-widest mb-2">Специальное предложение</div>
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">
                      СКИДКИ<br />ДО <span className="neon-text-pink">40%</span>
                    </h3>
                    <button onClick={() => setActiveSection("catalog")} className="btn-neon px-6 py-3 rounded-xl font-display font-bold text-sm">
                      Получить скидку
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews preview */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-[#00FFE0] text-xs font-display font-bold uppercase tracking-widest mb-2">Что говорят клиенты</div>
                  <h2 className="font-display font-black text-3xl">ОТЗЫВЫ</h2>
                </div>
                <button onClick={() => setActiveSection("reviews")} className="text-[#00FFE0] text-sm font-body font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Все отзывы <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {REVIEWS.slice(0, 3).map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===== CATALOG ===== */}
        {activeSection === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
            <div className="mb-8">
              <div className="text-[#FF2D9B] text-xs font-display font-bold uppercase tracking-widest mb-2">Все товары</div>
              <h1 className="font-display font-black text-3xl sm:text-4xl">КАТАЛОГ</h1>
            </div>

            <div className="flex gap-2 flex-wrap mb-8">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-body font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-[#FF2D9B] text-white shadow-[0_0_20px_rgba(255,45,155,0.4)]"
                      : "bg-[#111] border border-[#1E1E1E] text-[#888] hover:border-[#FF2D9B] hover:text-[#FF2D9B]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {searchQuery && (
              <div className="mb-6 text-[#888] font-body text-sm">
                Результаты поиска: <span className="text-white font-semibold">«{searchQuery}»</span>
                <button onClick={() => setSearchQuery("")} className="ml-3 text-[#FF2D9B] hover:underline">Сбросить</button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <div className="font-display font-bold text-xl text-[#555] mb-2">Ничего не найдено</div>
                <div className="text-[#444] font-body">Попробуйте другой запрос</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} isAdded={addedToCart === product.id} delay={i * 0.05} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {activeSection === "about" && (
          <div className="animate-fade-in">
            <div className="relative h-64 overflow-hidden">
              <img src={LIFESTYLE_IMAGE} alt="About" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]" />
              <div className="absolute bottom-8 left-8">
                <div className="text-[#FF2D9B] text-xs font-display font-bold uppercase tracking-widest mb-2">Кто мы</div>
                <h1 className="font-display font-black text-4xl text-white">О МАГАЗИНЕ</h1>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="font-display font-black text-2xl mb-6">
                    Мы создаём <span className="gradient-text">магазин будущего</span>
                  </h2>
                  <p className="text-[#888] font-body leading-relaxed mb-4">
                    NOVA SHOP — это современный интернет-магазин, где каждый товар проходит тщательный отбор. Мы работаем только с проверенными поставщиками и гарантируем подлинность каждого продукта.
                  </p>
                  <p className="text-[#888] font-body leading-relaxed mb-4">
                    Наша команда следит за мировыми трендами, чтобы вы всегда находили самое актуальное — будь то технологии, мода или аксессуары.
                  </p>
                  <p className="text-[#888] font-body leading-relaxed">
                    Быстрая доставка, честные цены и отличный сервис — вот наши главные принципы с 2020 года.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "Package", label: "850+ товаров", sub: "в каталоге", color: "#FF2D9B" },
                    { icon: "Users", label: "12 000+", sub: "клиентов", color: "#00FFE0" },
                    { icon: "Star", label: "4.9 / 5.0", sub: "средний рейтинг", color: "#FFE500" },
                    { icon: "Truck", label: "1–3 дня", sub: "доставка", color: "#9D00FF" },
                  ].map(item => (
                    <div key={item.label} className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-5 text-center card-hover">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${item.color}20` }}>
                        <Icon name={item.icon} size={20} style={{ color: item.color }} />
                      </div>
                      <div className="font-display font-bold text-lg text-white">{item.label}</div>
                      <div className="text-[#555] text-xs font-body mt-1">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl mb-6 text-center">Наши ценности</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: "Shield", title: "Гарантия качества", text: "Каждый товар проходит проверку перед отправкой. Не устраивает — вернём деньги.", color: "#FF2D9B" },
                    { icon: "Zap", title: "Быстрая доставка", text: "Отправляем в день заказа. Курьером до двери или в удобный пункт выдачи.", color: "#00FFE0" },
                    { icon: "HeartHandshake", title: "Поддержка 24/7", text: "Наша команда всегда на связи. Поможем с выбором и ответим на любой вопрос.", color: "#FFE500" },
                  ].map(v => (
                    <div key={v.title} className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${v.color}20` }}>
                        <Icon name={v.icon} size={24} style={{ color: v.color }} />
                      </div>
                      <h4 className="font-display font-bold text-base mb-2">{v.title}</h4>
                      <p className="text-[#666] font-body text-sm leading-relaxed">{v.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== CART ===== */}
        {activeSection === "cart" && (
          <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
            <div className="mb-8">
              <div className="text-[#FF2D9B] text-xs font-display font-bold uppercase tracking-widest mb-2">Ваши товары</div>
              <h1 className="font-display font-black text-3xl sm:text-4xl">КОРЗИНА</h1>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 animate-float inline-block">🛒</div>
                <h3 className="font-display font-bold text-2xl mb-3 text-[#555]">Корзина пуста</h3>
                <p className="text-[#444] font-body mb-8">Добавьте товары из каталога</p>
                <button onClick={() => setActiveSection("catalog")} className="btn-neon px-8 py-3 rounded-xl font-display font-bold text-sm">
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  {cartItems.map(product => (
                    <div key={product.id} className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl" style={{ background: `${product.color}20` }}>
                        🛍️
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-body font-semibold text-white truncate">{product.name}</div>
                        <div className="text-[#555] text-xs font-body mt-0.5">{product.category}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-display font-bold text-white">{product.price.toLocaleString()} ₽</div>
                        <button onClick={() => removeFromCart(product.id)} className="text-[#555] hover:text-red-400 transition-colors text-xs font-body mt-1">
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 h-fit">
                  <h3 className="font-display font-bold text-lg mb-4">Итого</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-[#888]">Товары ({cartItems.length})</span>
                      <span>{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-[#888]">Доставка</span>
                      <span className="text-[#00FFE0]">Бесплатно</span>
                    </div>
                    <div className="border-t border-[#1E1E1E] pt-3 flex justify-between font-display font-bold text-lg">
                      <span>Итого</span>
                      <span className="neon-text-pink">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                  </div>
                  <button className="btn-neon w-full py-4 rounded-xl font-display font-bold text-sm">
                    Оформить заказ
                  </button>
                  <button
                    onClick={() => setActiveSection("catalog")}
                    className="w-full py-3 mt-3 rounded-xl border border-[#1E1E1E] text-[#888] hover:text-white hover:border-[#333] transition-all text-sm font-body font-semibold"
                  >
                    Продолжить покупки
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== REVIEWS ===== */}
        {activeSection === "reviews" && (
          <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
            <div className="mb-12 text-center">
              <div className="text-[#00FFE0] text-xs font-display font-bold uppercase tracking-widest mb-2">Мнения покупателей</div>
              <h1 className="font-display font-black text-4xl mb-4">ОТЗЫВЫ</h1>
              <div className="flex items-center justify-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#FFE500] text-xl">★</span>
                  ))}
                </div>
                <span className="font-display font-bold text-2xl">4.9</span>
                <span className="text-[#555] font-body">из 5.0 • 1234 отзыва</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {REVIEWS.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            <div className="bg-[#111] border border-[#1E1E1E] rounded-3xl p-8 max-w-xl mx-auto">
              <h3 className="font-display font-bold text-xl mb-2">Оставить отзыв</h3>
              <p className="text-[#666] font-body text-sm mb-6">Поделитесь своим опытом покупки</p>
              <div className="space-y-4">
                <input type="text" placeholder="Ваше имя" className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#444]" />
                <textarea placeholder="Напишите ваш отзыв..." rows={4} className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#444] resize-none" />
                <button className="btn-neon w-full py-3 rounded-xl font-display font-bold text-sm">Отправить отзыв</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== BLOG ===== */}
        {activeSection === "blog" && (
          <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
            <div className="mb-12">
              <div className="text-[#FFE500] text-xs font-display font-bold uppercase tracking-widest mb-2">Интересное</div>
              <h1 className="font-display font-black text-4xl">БЛОГ</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {BLOG_POSTS.map(post => (
                <article key={post.id} className="bg-[#111] border border-[#1E1E1E] rounded-3xl overflow-hidden card-hover cursor-pointer group">
                  <div className="h-48 relative overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${post.color}30, #0A0A0A)` }}>
                    <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">📝</div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-display font-bold" style={{ background: `${post.color}20`, color: post.color }}>
                        {post.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-base mb-3 group-hover:text-[#FF2D9B] transition-colors leading-tight">{post.title}</h3>
                    <div className="flex items-center justify-between text-[#555] text-xs font-body">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        {post.readTime} чтения
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#111] to-[#0F0F0F] border border-[#1E1E1E] rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-[#FF2D9B] opacity-5 blur-[80px] rounded-full" />
              <div className="relative">
                <div className="text-[#FF2D9B] text-xs font-display font-bold uppercase tracking-widest mb-3">Рассылка</div>
                <h3 className="font-display font-black text-2xl mb-2">БУДЬТЕ В КУРСЕ</h3>
                <p className="text-[#666] font-body text-sm mb-6">Получайте новости о новинках и акциях первыми</p>
                <div className="flex max-w-md mx-auto gap-3">
                  <input type="email" placeholder="Ваш email" className="flex-1 bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#444]" />
                  <button className="btn-neon px-6 py-3 rounded-xl font-display font-bold text-sm flex-shrink-0">Подписаться</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== CONTACTS ===== */}
        {activeSection === "contacts" && (
          <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
            <div className="mb-12">
              <div className="text-[#9D00FF] text-xs font-display font-bold uppercase tracking-widest mb-2">Мы на связи</div>
              <h1 className="font-display font-black text-4xl">КОНТАКТЫ</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="font-display font-bold text-xl">Напишите нам</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Ваше имя" className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#444]" />
                  <input type="email" placeholder="Email" className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#444]" />
                  <input type="tel" placeholder="Телефон" className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#444]" />
                  <textarea placeholder="Ваше сообщение..." rows={4} className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#444] resize-none" />
                  <button className="btn-neon w-full py-4 rounded-xl font-display font-bold text-sm">Отправить сообщение</button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-display font-bold text-xl">Наши контакты</h3>
                <div className="space-y-4">
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 (800) 123-45-67", sub: "Бесплатно, пн–вс 9:00–21:00", color: "#FF2D9B" },
                    { icon: "Mail", label: "Email", value: "hello@novashop.ru", sub: "Ответим в течение 2 часов", color: "#00FFE0" },
                    { icon: "MapPin", label: "Адрес", value: "Москва, ул. Тверская, 1", sub: "Пн–Пт 10:00–19:00", color: "#FFE500" },
                    { icon: "MessageCircle", label: "Telegram", value: "@novashop", sub: "Самый быстрый способ", color: "#9D00FF" },
                  ].map(c => (
                    <div key={c.label} className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${c.color}20` }}>
                        <Icon name={c.icon} size={20} style={{ color: c.color }} />
                      </div>
                      <div>
                        <div className="text-[#555] text-xs font-body mb-0.5">{c.label}</div>
                        <div className="font-body font-semibold text-white text-sm">{c.value}</div>
                        <div className="text-[#444] text-xs font-body">{c.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E1E1E] bg-[#0A0A0A] mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display font-black text-lg">
            <span className="gradient-text">NOVA</span><span className="text-white">SHOP</span>
          </div>
          <div className="text-[#444] text-xs font-body text-center">© 2025 NOVA SHOP. Все права защищены</div>
          <div className="flex gap-4 text-[#444] text-xs font-body">
            <button className="hover:text-[#FF2D9B] transition-colors">Политика конфиденциальности</button>
            <button className="hover:text-[#FF2D9B] transition-colors">Условия</button>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {addedToCart !== null && (
        <div className="fixed bottom-6 right-6 bg-[#111] border border-[#FF2D9B]/30 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-2xl animate-slide-up z-50">
          <div className="w-8 h-8 bg-[#FF2D9B]/20 rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} className="text-[#FF2D9B]" />
          </div>
          <span className="text-sm font-body font-semibold text-white">Добавлено в корзину!</span>
        </div>
      )}
    </div>
  );
}
