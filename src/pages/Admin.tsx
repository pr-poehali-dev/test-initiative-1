import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/9039ecd5-a8e8-431f-8a03-4626a52e12c9";

const CATEGORIES = ["Техника", "Часы", "Аксессуары", "Обувь", "Одежда", "Другое"];
const COLORS = [
  { label: "Розовый", value: "#FF2D9B" },
  { label: "Циан", value: "#00FFE0" },
  { label: "Жёлтый", value: "#FFE500" },
  { label: "Фиолетовый", value: "#9D00FF" },
];
const EMOJIS = ["🛍️", "🎧", "⌚", "👜", "👟", "🧥", "🎒", "🕶️", "🔊", "📱", "💻", "🎮"];

type Product = {
  id: number;
  name: string;
  price: number;
  old_price: number | null;
  category: string;
  rating: number;
  reviews_count: number;
  badge: string | null;
  color: string;
  emoji: string;
  is_active: boolean;
  created_at: string;
};

const emptyForm = {
  name: "",
  price: "",
  old_price: "",
  category: "Техника",
  rating: "5.0",
  reviews_count: "0",
  badge: "",
  color: "#FF2D9B",
  emoji: "🛍️",
  is_active: true,
};

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: String(p.price),
      old_price: p.old_price ? String(p.old_price) : "",
      category: p.category,
      rating: String(p.rating),
      reviews_count: String(p.reviews_count),
      badge: p.badge || "",
      color: p.color,
      emoji: p.emoji,
      is_active: p.is_active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    const payload = {
      ...(editingId ? { id: editingId } : {}),
      name: form.name,
      price: Number(form.price),
      old_price: form.old_price ? Number(form.old_price) : null,
      category: form.category,
      rating: Number(form.rating),
      reviews_count: Number(form.reviews_count),
      badge: form.badge || null,
      color: form.color,
      emoji: form.emoji,
      is_active: form.is_active,
    };
    await fetch(API_URL, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await fetchProducts();
    setShowForm(false);
    setSaving(false);
    showToast(editingId ? "Товар обновлён" : "Товар добавлен");
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
    await fetchProducts();
    setDeleteConfirm(null);
    showToast("Товар удалён");
  };

  const toggleActive = async (p: Product) => {
    await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...p, is_active: !p.is_active }),
    });
    await fetchProducts();
    showToast(p.is_active ? "Товар скрыт" : "Товар опубликован");
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="border-b border-[#1E1E1E] bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-[#555] hover:text-white transition-colors">
              <Icon name="ArrowLeft" size={18} />
            </a>
            <span className="font-display font-bold text-base">
              <span className="gradient-text">NOVA</span>
              <span className="text-white">SHOP</span>
            </span>
            <span className="text-[#333] text-sm">/</span>
            <span className="text-[#888] text-sm font-body">Админ-панель</span>
          </div>
          <div className="flex items-center gap-2 text-[#555] text-xs font-body">
            <Icon name="Package" size={14} />
            {products.length} товаров
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title + actions */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-black text-2xl">Товары</h1>
          <button
            onClick={openCreate}
            className="btn-neon px-5 py-2.5 rounded-xl font-body font-semibold text-sm flex items-center gap-2"
          >
            <Icon name="Plus" size={16} />
            Добавить товар
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-2.5 mb-6 max-w-sm">
          <Icon name="Search" size={15} className="text-[#555]" />
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-white outline-none w-full placeholder-[#444] font-body"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-[#555] font-body">Загрузка...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#555] font-body">Ничего не найдено</div>
        ) : (
          <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-5 py-3 border-b border-[#1A1A1A] text-[#555] text-xs font-display uppercase tracking-widest">
              <span>Товар</span>
              <span>Цена</span>
              <span>Категория</span>
              <span>Статус</span>
              <span></span>
            </div>
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className={`grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-5 py-4 items-center ${i < filtered.length - 1 ? "border-b border-[#161616]" : ""} hover:bg-[#131313] transition-colors`}
              >
                {/* Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${p.color}20` }}>
                    {p.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="font-body font-semibold text-sm text-white truncate">{p.name}</div>
                    {p.badge && (
                      <span className="text-[10px] font-display font-bold px-1.5 py-0.5 rounded mt-0.5 inline-block" style={{ background: `${p.color}25`, color: p.color }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                </div>
                {/* Price */}
                <div>
                  <div className="font-display font-bold text-sm text-white">{p.price.toLocaleString()} ₽</div>
                  {p.old_price && <div className="text-[#444] text-xs font-body line-through">{p.old_price.toLocaleString()} ₽</div>}
                </div>
                {/* Category */}
                <div className="text-[#888] text-sm font-body">{p.category}</div>
                {/* Status toggle */}
                <div>
                  <button
                    onClick={() => toggleActive(p)}
                    className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-all ${
                      p.is_active
                        ? "bg-green-500/15 text-green-400 hover:bg-green-500/25"
                        : "bg-[#1A1A1A] text-[#555] hover:bg-[#222]"
                    }`}
                  >
                    {p.is_active ? "Активен" : "Скрыт"}
                  </button>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1 justify-end">
                  <button
                    onClick={() => openEdit(p)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#555] hover:text-white hover:bg-[#1E1E1E] transition-all"
                  >
                    <Icon name="Pencil" size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(p.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#555] hover:text-red-400 hover:bg-red-400/10 transition-all"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
              <h2 className="font-display font-bold text-lg">{editingId ? "Редактировать товар" : "Новый товар"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#555] hover:text-white transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs text-[#666] font-body uppercase tracking-wider block mb-1.5">Название *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Название товара"
                  className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#333]"
                />
              </div>

              {/* Price row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#666] font-body uppercase tracking-wider block mb-1.5">Цена, ₽ *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="9990"
                    className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#333]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#666] font-body uppercase tracking-wider block mb-1.5">Старая цена, ₽</label>
                  <input
                    type="number"
                    value={form.old_price}
                    onChange={e => setForm(f => ({ ...f, old_price: e.target.value }))}
                    placeholder="14990"
                    className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#333]"
                  />
                </div>
              </div>

              {/* Category + Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#666] font-body uppercase tracking-wider block mb-1.5">Категория</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#666] font-body uppercase tracking-wider block mb-1.5">Бейдж</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
                    placeholder="ХИТ / НОВИНКА / -20%"
                    className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white placeholder-[#333]"
                  />
                </div>
              </div>

              {/* Rating + Reviews */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#666] font-body uppercase tracking-wider block mb-1.5">Рейтинг (0–5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
                    className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#666] font-body uppercase tracking-wider block mb-1.5">Кол-во отзывов</label>
                  <input
                    type="number"
                    value={form.reviews_count}
                    onChange={e => setForm(f => ({ ...f, reviews_count: e.target.value }))}
                    className="w-full bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl px-4 py-2.5 text-sm font-body outline-none focus:border-[#FF2D9B] transition-colors text-white"
                  />
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="text-xs text-[#666] font-body uppercase tracking-wider block mb-2">Цвет акцента</label>
                <div className="flex gap-2">
                  {COLORS.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setForm(f => ({ ...f, color: c.value }))}
                      title={c.label}
                      className={`w-9 h-9 rounded-xl border-2 transition-all ${form.color === c.value ? "border-white scale-110" : "border-transparent"}`}
                      style={{ background: c.value }}
                    />
                  ))}
                  <input
                    type="color"
                    value={form.color}
                    onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                    className="w-9 h-9 rounded-xl border-2 border-[#1E1E1E] cursor-pointer bg-transparent"
                    title="Свой цвет"
                  />
                </div>
              </div>

              {/* Emoji */}
              <div>
                <label className="text-xs text-[#666] font-body uppercase tracking-wider block mb-2">Иконка товара</label>
                <div className="flex gap-2 flex-wrap">
                  {EMOJIS.map(e => (
                    <button
                      key={e}
                      onClick={() => setForm(f => ({ ...f, emoji: e }))}
                      className={`w-10 h-10 rounded-xl text-xl transition-all ${form.emoji === e ? "bg-[#FF2D9B]/20 border-2 border-[#FF2D9B]" : "bg-[#0A0A0A] border-2 border-[#1E1E1E] hover:border-[#333]"}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Is active */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-body font-semibold text-white">Опубликован</div>
                  <div className="text-xs text-[#555] font-body">Показывать товар в каталоге</div>
                </div>
                <button
                  onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                  className={`w-12 h-6 rounded-full transition-all relative ${form.is_active ? "bg-[#FF2D9B]" : "bg-[#2A2A2A]"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow ${form.is_active ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-xl border border-[#1E1E1E] text-[#888] hover:text-white hover:border-[#333] transition-all text-sm font-body font-semibold"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.price}
                className="flex-1 btn-neon py-3 rounded-xl font-body font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Сохраняю..." : editingId ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 w-full max-w-sm text-center">
            <div className="text-4xl mb-4">🗑️</div>
            <h3 className="font-display font-bold text-lg mb-2">Удалить товар?</h3>
            <p className="text-[#666] text-sm font-body mb-6">Это действие нельзя отменить</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-[#1E1E1E] text-[#888] hover:text-white transition-all text-sm font-body">
                Отмена
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-sm font-body font-semibold">
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#111] border border-[#FF2D9B]/30 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-2xl z-50 animate-fade-in">
          <Icon name="Check" size={16} className="text-[#FF2D9B]" />
          <span className="text-sm font-body font-semibold text-white">{toast}</span>
        </div>
      )}
    </div>
  );
}
