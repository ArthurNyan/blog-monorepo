# API Documentation Endpoint

## Описание

Этот кастомный API endpoint предоставляет публичный доступ к OpenAPI документации в формате JSON.

## Использование

### Получение документации

```bash
GET /api/documentation/:version/:slug
```

#### Параметры

- `version` - версия документации (например, `1.0.0`)
- `slug` - имя файла документации без расширения (например, `full_documentation`)

#### Пример запроса

```bash
curl http://localhost:1337/api/documentation/1.0.0/full_documentation
```

#### Ответ

Возвращает полную OpenAPI спецификацию в формате JSON, которую можно использовать с:

- Swagger UI
- Postman
- Insomnia
- Генераторами клиентов API
- Другими инструментами, поддерживающими OpenAPI 3.0

## Доступ

Endpoint не требует авторизации и доступен публично.

## Структура файлов

```
src/api/doc-api/
├── controllers/
│   └── doc-api.ts      # Контроллер для обработки запросов
└── routes/
    └── doc-api.ts       # Определение маршрутов
```

## Исходные файлы документации

Файлы документации генерируются автоматически плагином `@strapi/plugin-documentation` и находятся в:

```
src/extensions/documentation/documentation/:version/:slug.json
```

Эти файлы исключены из git через `.gitignore`, так как они генерируются автоматически при каждом запуске приложения.
