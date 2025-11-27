# LARO — Business Card Website

Веб-сайт визитка с использованием Tailwind CSS 4 и полноценной локальной сборкой.

## Установка зависимостей

```bash
npm install
```

## Сборка стилей Tailwind CSS 4

### Production сборка (минифицированная):
```bash
npm run build:css
```

### Development сборка (с source maps):
```bash
npm run build:css:dev
```

### Режим наблюдения (автоматическая пересборка при изменениях):
```bash
npm run watch:css
```

или

```bash
npm run dev
```

### Очистка собранных файлов:
```bash
npm run clean
```

## Как это работает

### Архитектура Tailwind CSS 4

Проект использует **полноценную локальную сборку Tailwind CSS 4** через PostCSS плагин `@tailwindcss/postcss`.

1. **Исходный файл** `styles.css` содержит:
   - `@import "tailwindcss"` - импорт Tailwind CSS 4 (новый синтаксис)
   - `@theme` - CSS-first конфигурация темы с использованием oklch цветов
   - `@utility` - кастомные утилиты для специфичных стилей
   - Кастомные CSS классы и стили

2. **PostCSS обработка** (`postcss.config.js`):
   - Плагин `@tailwindcss/postcss` обрабатывает CSS
   - Автоматически генерирует утилиты Tailwind на основе использования в HTML
   - Оптимизирует выходной CSS

3. **После генерации** (`npm run build:css`):
   - PostCSS обрабатывает `styles.css`
   - Генерирует финальный CSS в `dist/styles.css`
   - Минифицирует код для production
   - Создает source maps для development режима

4. **В режиме watch** (`npm run watch:css`):
   - Автоматически пересобирает стили при изменении `styles.css` или HTML файлов
   - Создает source maps для удобной отладки
   - Идеально для разработки

## Особенности конфигурации Tailwind CSS 4

### CSS-first конфигурация
- Используется `@theme` вместо `tailwind.config.js`
- Цвета определены в формате oklch для лучшей цветопередачи
- Кастомные шрифты, размеры текста, тени и easing функции

### Кастомные утилиты
- `@utility backdrop-blur-3xl` - размытие фона 64px
- `@utility backdrop-blur-40` - размытие фона 40px  
- `@utility backdrop-saturate-180` - насыщенность 180%

### Оптимизация
- Production сборка минифицируется автоматически
- Development сборка включает source maps
- PostCSS оптимизирует выходной CSS

## Структура проекта

- `index.html` - главная страница
- `styles.css` - исходный файл стилей с Tailwind CSS 4 конфигурацией
- `dist/styles.css` - сгенерированный CSS (не коммитится в git)
- `postcss.config.js` - конфигурация PostCSS
- `package.json` - зависимости и скрипты сборки
- `scripts.js` - JavaScript функциональность
- `assets/` - изображения и ресурсы

## Технологии

- **Tailwind CSS 4.1.17** - утилитарный CSS фреймворк
- **PostCSS 8.5.6** - инструмент для трансформации CSS
- **@tailwindcss/postcss** - официальный PostCSS плагин для Tailwind CSS 4

## Разработка

1. Запустите watch режим: `npm run dev`
2. Откройте `index.html` в браузере
3. Редактируйте `styles.css` или `index.html` - изменения применятся автоматически
4. Для production: `npm run build:css`

