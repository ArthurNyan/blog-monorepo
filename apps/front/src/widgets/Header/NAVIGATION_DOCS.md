# Документация по навигации Header

> **Примечание**: Header реорганизован согласно FSD архитектуре.  
> См. [FSD_ARCHITECTURE.md](../../../FSD_ARCHITECTURE.md) для деталей.

## Использование

```tsx
import { Header } from '@/widgets/Header';
import type { HeaderProps, NavigationItem } from '@/widgets/Header';
```

## Структура данных для Strapi

Header компонент поддерживает динамическую навигацию с двумя типами пунктов меню:
1. **Простая ссылка** - обычная ссылка без выпадающего меню
2. **Выпадающее меню** - пункт с подменю, включающим список ссылок и опциональный featured элемент

### Типы данных

```typescript
interface NavigationLinkItem {
  title: string;        // Заголовок ссылки
  href: string;         // URL ссылки
  description?: string; // Опциональное описание
}

interface NavigationItem {
  label: string;        // Название пункта меню
  href?: string;        // Прямая ссылка (если нет submenu)
  submenu?: {
    featured?: NavigationLinkItem;  // Featured элемент (большая карточка)
    items: NavigationLinkItem[];    // Список подпунктов
  };
}
```

### Пример данных для Strapi

```json
{
  "navigation": [
    {
      "label": "Getting Started",
      "submenu": {
        "featured": {
          "title": "shadcn/ui",
          "href": "/",
          "description": "Beautifully designed components built with Radix UI and Tailwind CSS."
        },
        "items": [
          {
            "title": "Introduction",
            "href": "/docs",
            "description": "Re-usable components built using Radix UI and Tailwind CSS."
          },
          {
            "title": "Installation",
            "href": "/docs/installation",
            "description": "How to install dependencies and structure your app."
          },
          {
            "title": "Typography",
            "href": "/docs/primitives/typography",
            "description": "Styles for headings, paragraphs, lists...etc"
          }
        ]
      }
    },
    {
      "label": "Components",
      "submenu": {
        "items": [
          {
            "title": "Alert Dialog",
            "href": "/docs/primitives/alert-dialog",
            "description": "A modal dialog that interrupts the user with important content."
          },
          {
            "title": "Hover Card",
            "href": "/docs/primitives/hover-card",
            "description": "For sighted users to preview content available behind a link."
          }
        ]
      }
    },
    {
      "label": "Documentation",
      "href": "/docs"
    }
  ]
}
```

## Использование в Astro

```astro
---
import { Header } from '@/shared/components/ui/header';

// Получите данные из Strapi
const navigationData = await fetch('YOUR_STRAPI_URL/api/navigation')
  .then(res => res.json());
---

<Header navigationItems={navigationData.navigation} client:load />
```

## Особенности реализации

### Desktop версия
- Использует компонент `NavigationMenu` с выпадающими меню
- Featured элемент отображается как большая карточка слева
- Подпункты располагаются в сетке (1 или 2 колонки в зависимости от наличия featured)

### Mobile версия
- Все пункты отображаются вертикально
- Featured элемент показывается первым в списке
- Выпадающие меню раскрываются полностью
- Сохраняются описания для лучшей навигации

## Структура в Strapi

### Collection Type: Navigation

**Поля:**

1. **label** (Text) - обязательное
2. **href** (Text) - опциональное
3. **submenu** (Component) - опциональное, repeatable: false
   - **featured** (Component) - опциональное
     - **title** (Text)
     - **href** (Text)
     - **description** (Text)
   - **items** (Component) - обязательное, repeatable: true
     - **title** (Text)
     - **href** (Text)
     - **description** (Text)

### Валидация

- Если `href` указан, то `submenu` должен быть пустым
- Если `submenu` указан, то `href` должен быть пустым
- В `submenu.items` должен быть хотя бы один элемент
