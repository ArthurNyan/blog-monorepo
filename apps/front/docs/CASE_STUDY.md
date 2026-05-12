# 🚀 Кейс: Создание современного портфолио-блога с Astro и интерактивными эффектами

## 📌 О проекте

**Стек:** Astro 5 + React 19 + TypeScript + Tailwind CSS 4  
**Сложность:** Продвинутый  
**Время разработки:** 3-4 недели  
**Результат:** Высокопроизводительный статический сайт с впечатляющими визуальными эффектами

---

## 🎯 Проблема и задача

**Проблема:** Современные портфолио часто страдают от:
- Медленной загрузки из-за тяжелых фреймворков
- Однообразного дизайна без запоминающихся визуальных эффектов
- Сложной интеграции с CMS для управления контентом
- Плохой производительности при использовании сложной графики

**Задача:** Создать визуально впечатляющий портфолио-блог, который:
- ⚡ Загружается мгновенно (Lighthouse Score 90+)
- 🎨 Имеет уникальные интерактивные эффекты
- 📝 Легко управляется через Strapi CMS
- 🔄 Генерирует типобезопасный API автоматически
- 📱 Адаптивен и доступен на всех устройствах

---

## 💡 Решение

### 1. **Архитектура: Astro Islands + React**

Выбрал **Astro** как основу проекта — это позволило:

```typescript
// Компоненты загружаются только когда нужно
<HeroSection />
<LogoPanel client:visible />        // Загружается при появлении в viewport
<FeatureTabs client:idle />         // Загружается когда браузер свободен
<TestimonialsPanel client:idle />
<BentoGridWidget client:visible />
```

**Почему это круто:**
- 🏝️ **Islands Architecture** — React компоненты загружаются выборочно
- 📦 JavaScript инициализируется только для интерактивных блоков
- 🚀 Статическая генерация = молниеносная загрузка
- 🎯 Идеальный баланс между SSG и интерактивностью

### 2. **Сложные визуальные эффекты на Three.js**

Создал кастомный компонент `PixelBlast` — интерактивный пиксельный фон:

```typescript
<PixelBlast 
  variant="circle"
  pixelSize={3}
  enableRipples={true}
  liquid={true}
  liquidStrength={0.1}
/>
```

**Технические детали:**
- 🎮 **WebGL шейдеры** на GLSL3 для рендеринга
- 🌊 **Liquid эффект** с помощью postprocessing
- 🎨 **Bayer Dithering** для ретро-эстетики
- 👆 **Touch/Mouse взаимодействие** с волновыми эффектами
- ⚡ **Оптимизация:** автопауза вне viewport, ResizeObserver

**Что особенного:**
```typescript
// Кастомный шейдер с FBM (Fractional Brownian Motion)
float fbm2(vec2 uv, float t) {
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  for (int i = 0; i < 5; ++i) {
    sum += amp * vnoise(p * freq);
    freq *= 1.25;
    amp *= 1.0;
  }
  return sum * 0.5 + 0.5;
}
```

### 3. **Feature-Sliced Design (FSD)**

Организовал код по методологии FSD:

```
src/
├── shared/          # Переиспользуемый код
│   ├── api/         # API клиент (автогенерация)
│   ├── components/  # UI-kit (button, card, badge)
│   ├── hooks/       # Кастомные хуки
│   └── lib/         # Утилиты
├── widgets/         # Композитные блоки
│   ├── Header/
│   ├── Footer/
│   ├── ArticleCard/
│   └── BentoGrid/
└── pages/           # Astro страницы
```

**Преимущества:**
- 📁 Четкая структура с разделением по слоям
- 🔄 Легко поддерживать и масштабировать
- 🧩 Изолированные модули с явными зависимостями

### 4. **Автогенерация типобезопасного API**

Интеграция с Strapi через OpenAPI:

```typescript
// openapi-ts.config.ts
export default defineConfig({
  base: 'http://localhost:1337',
  input: 'http://localhost:1337/api/documentation/1.0.0/full_documentation',
  output: {
    path: 'src/shared/api/generated',
    lint: 'eslint',
    format: 'prettier'
  },
  plugins: ['@hey-api/client-axios']
})
```

**Результат:**
```typescript
// Типизированные запросы из коробки
const { data: articles } = await getArticles({ 
  query: { populate: "*" } 
});

// TypeScript знает структуру данных!
interface Article {
  name: string;
  slug: string;
  description: string;
  cover: UploadFile;
  // ... все поля типизированы
}
```

### 5. **Современный UI с анимациями**

Использовал **Motion (Framer Motion)** для плавных переходов:

```typescript
<motion.section
  initial={{ opacity: 0, y: 64 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    delay: 0.2,
    duration: 0.5,
    type: 'keyframes'
  }}
>
```

**UI Компоненты:**
- 🎴 **BentoGrid** — трендовая раскладка карточек
- 🔄 **Infinite Slider** — бесконечная прокрутка логотипов
- 🌟 **Highlighter** — эффект подсветки при наведении
- 🍔 **Animated Menu Toggle** — плавная анимация бургера
- 📍 **Timeline** — визуализация истории проекта

### 6. **Продвинутый Header с скрытием**

Умная навигация, которая прячется при скролле вниз:

```typescript
const { isVisible } = useScrollDirection(50);
const scrolled = useScroll(10);

<header className={cn({
  'backdrop-blur-lg': scrolled,
  '-translate-y-full': !isVisible && !open,
  'border-border': scrolled
})}>
```

**Фишки:**
- 🎯 Прячется при скролле вниз, появляется при скролле вверх
- 🌫️ Backdrop blur эффект при прокрутке
- 🖱️ Hover-зона для возврата шапки
- 📱 Адаптивное мобильное меню с анимацией

### 7. **Оптимизация бандла**

Настроил агрессивное разделение кода в Vite:

```javascript
manualChunks(id) {
  if (id.includes('node_modules')) {
    let pkg = id.includes('.pnpm/')
      ? id.split('.pnpm/')[1].split('/')[0]
      : id.split('node_modules/')[1].split('/')[0];
    
    // Three.js отдельно из-за размера
    if (pkg.includes('three') || 
        pkg.includes('postprocessing') || 
        pkg.includes('motion')) {
      return pkg;
    }
    return 'vendor';
  }
}
```

**Результат:**
- 📦 Тяжелые библиотеки в отдельных чанках
- ⚡ Параллельная загрузка модулей
- 🎯 Three.js загружается только на страницах с 3D

---

## 🛠️ Технические детали

### Стек технологий

| Категория | Технология | Зачем используется |
|-----------|-----------|-------------------|
| **Фреймворк** | Astro 5.16 | SSG + Islands Architecture |
| **UI библиотека** | React 19 | Интерактивные компоненты |
| **Стили** | Tailwind CSS 4 | Утилитарный CSS |
| **Анимации** | Motion 12 | Плавные переходы |
| **3D Графика** | Three.js + postprocessing | WebGL эффекты |
| **Type Safety** | TypeScript | Строгая типизация |
| **Иконки** | Lucide React | Современные SVG иконки |
| **UI компоненты** | Radix UI | Доступные примитивы |
| **API генерация** | @hey-api/openapi-ts | Автогенерация клиента |
| **HTTP клиент** | Axios | API запросы |

### Кастомные хуки

```typescript
// Отслеживание направления скролла
export const useScrollDirection = (threshold = 50) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        return;
      }
      
      setIsVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);
  
  return { isVisible };
};
```

### Типобезопасность изображений

Расширил автогенерированные типы для работы с Strapi:

```typescript
// overrides.d.ts
export interface ImageFormats {
  thumbnail?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
}

declare module './types.gen' {
  interface UploadFile {
    formats?: ImageFormats;
  }
}
```

---

## 📊 Результаты

### Производительность

| Метрика | Значение | Комментарий |
|---------|----------|-------------|
| **First Contentful Paint** | < 1.0s | Мгновенная отрисовка |
| **Time to Interactive** | < 2.5s | Быстрая интерактивность |
| **Total Bundle Size** | ~250KB (gzipped) | Без учета on-demand чанков |
| **Lighthouse Score** | 90+ | Отличная производительность |

### Оптимизации

✅ **Code Splitting** — Three.js загружается отдельно  
✅ **Tree Shaking** — Tailwind CSS генерирует только используемые стили  
✅ **Lazy Loading** — Компоненты загружаются по требованию  
✅ **Image Optimization** — Адаптивные форматы из Strapi  
✅ **Prefetch** — Preload критичных стилей  

---

## 🎨 Дизайн-решения

### BentoGrid Layout

Современная раскладка карточек разных размеров:

```typescript
const BENTO_ITEMS: BentoItem[] = [
  {
    title: "Analytics Dashboard",
    colSpan: 2,  // Занимает 2 колонки
    hasPersistentHover: true
  },
  {
    title: "Task Manager",
    colSpan: 1  // Стандартная карточка
  }
];
```

### Dark Mode First

Проект разработан с приоритетом темной темы:

```html
<body class="dark">
  <!-- Tailwind CSS автоматически применяет dark: варианты -->
</body>
```

### Адаптивность

Все компоненты работают на всех разрешениях:

```typescript
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  // Mobile-first подход
</div>
```

---

## 🚀 Что можно улучшить

### Дальнейшие оптимизации

1. **View Transitions API** — Плавные переходы между страницами
2. **Edge Rendering** — Деплой на Vercel Edge/Cloudflare Workers
3. **Progressive Image Loading** — BlurHash для placeholder'ов
4. **Internationalization** — Мультиязычность через Astro i18n
5. **Search** — Интеграция Algolia или Meilisearch
6. **RSS Feed** — Автогенерация фида для подписчиков

### Расширение функционала

- 💬 **Комментарии** через Giscus/Disqus
- 🔍 **Полнотекстовый поиск** по статьям
- 📧 **Newsletter** с email подпиской
- 📈 **Analytics** с Plausible/Umami
- 🌙 **Переключатель темы** (светлая/темная)
- 🔖 **Теги и категории** для фильтрации

---

## 💭 Выводы и инсайты

### Что получилось хорошо

✅ **Astro Islands** — идеальный баланс производительности и интерактивности  
✅ **Автогенерация API** — экономия времени и меньше ошибок  
✅ **WebGL эффекты** — уникальный визуальный стиль  
✅ **FSD архитектура** — чистый и поддерживаемый код  

### Чему научился

1. **Работа с WebGL шейдерами** — создание кастомных визуальных эффектов
2. **Оптимизация Three.js** — правильное управление памятью и производительностью
3. **Astro Islands Architecture** — понимание гибридного подхода SSG + CSR
4. **OpenAPI интеграция** — автоматизация генерации типобезопасного API

### Рекомендации

🎯 **Для похожих проектов:**
- Используйте Astro для контентных сайтов с небольшой интерактивностью
- Инвестируйте в настройку автогенерации API — окупится быстро
- Не бойтесь WebGL — современные библиотеки делают его доступным
- Придерживайтесь архитектурных паттернов (FSD) с самого начала

⚠️ **Подводные камни:**
- Three.js увеличивает bundle size — используйте lazy loading
- WebGL может тормозить на слабых устройствах — добавьте fallback
- Типы для CMS данных лучше дополнять вручную (overrides)

---

## 🔗 Полезные ресурсы

- [Astro Documentation](https://docs.astro.build)
- [Three.js Journey](https://threejs-journey.com)
- [Feature-Sliced Design](https://feature-sliced.design)
- [Tailwind CSS v4 Beta](https://tailwindcss.com/docs)
- [Hey API OpenAPI TS](https://heyapi.vercel.app)
- [Motion for React](https://motion.dev)

---

## 📝 Заключение

Этот проект показывает, что **производительность и визуальная привлекательность не исключают друг друга**. Правильный выбор технологий и архитектурных решений позволяет создать:

- ⚡ Быстрый статический сайт
- 🎨 С впечатляющими визуальными эффектами  
- 🔧 Легко поддерживаемый и расширяемый
- 📱 Работающий на всех устройствах

**Ключевой инсайт:** Astro Islands + React + WebGL = идеальный стек для современного портфолио-блога, где нужна как производительность, так и вау-эффект.

---

*Проект создан как дипломная работа для демонстрации навыков современной веб-разработки*

**Stack:** `Astro` `React` `TypeScript` `Three.js` `Tailwind CSS` `Motion` `OpenAPI` `Strapi`
