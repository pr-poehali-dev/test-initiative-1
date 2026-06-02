CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  old_price INTEGER,
  category VARCHAR(100) NOT NULL DEFAULT 'Другое',
  rating NUMERIC(2,1) NOT NULL DEFAULT 5.0,
  reviews_count INTEGER NOT NULL DEFAULT 0,
  badge VARCHAR(50),
  color VARCHAR(20) NOT NULL DEFAULT '#FF2D9B',
  emoji VARCHAR(10) NOT NULL DEFAULT '🛍️',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, price, old_price, category, rating, reviews_count, badge, color, emoji) VALUES
('AirPods Ultra X', 12990, 17990, 'Техника', 4.9, 234, 'ХИТ', '#FF2D9B', '🎧'),
('Smart Watch Pro', 24990, NULL, 'Часы', 4.7, 89, 'НОВИНКА', '#00FFE0', '⌚'),
('Сумка Minimal', 8490, 11990, 'Аксессуары', 4.8, 156, '-29%', '#FFE500', '👜'),
('Кроссовки Neo', 15990, NULL, 'Обувь', 4.6, 312, 'ТОП', '#9D00FF', '👟'),
('Куртка Future', 19990, 28000, 'Одежда', 4.9, 67, '-29%', '#FF2D9B', '🧥'),
('Рюкзак Urban', 6990, NULL, 'Аксессуары', 4.5, 198, 'POPULAR', '#00FFE0', '🎒'),
('Очки Cyber', 4990, 6990, 'Аксессуары', 4.7, 445, '-28%', '#FFE500', '🕶️'),
('Bluetooth Speaker', 9990, NULL, 'Техника', 4.8, 123, 'НОВИНКА', '#9D00FF', '🔊');
