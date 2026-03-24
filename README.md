# DevAI Studio Backend

Node.js backend с OAuth авторизацией для DevAI Studio.

## Установка

```bash
npm install
```

## Настройка

1. Скопируй `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Получи OAuth credentials:

### Google OAuth
1. Перейди на https://console.cloud.google.com/
2. Создай новый проект или выбери существующий
3. Включи Google+ API
4. Создай OAuth 2.0 credentials
5. Добавь redirect URI: `http://localhost:3000/auth/google/callback`
6. Скопируй Client ID и Client Secret в `.env`

### GitHub OAuth
1. Перейди на https://github.com/settings/developers
2. Нажми "New OAuth App"
3. Заполни:
   - Application name: DevAI Studio
   - Homepage URL: http://localhost:8080
   - Authorization callback URL: http://localhost:3000/auth/github/callback
4. Скопируй Client ID и Client Secret в `.env`

## Запуск

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Сервер запустится на http://localhost:3000

## API Endpoints

### Authentication
- `GET /auth/google` - Начать Google OAuth
- `GET /auth/github` - Начать GitHub OAuth
- `GET /auth/logout` - Выйти из аккаунта
- `GET /auth/status` - Проверить статус авторизации

### User
- `GET /api/user/profile` - Получить профиль пользователя
- `PUT /api/user/profile` - Обновить профиль

### Projects
- `GET /api/projects` - Получить все проекты пользователя
- `GET /api/projects/:id` - Получить проект по ID
- `POST /api/projects` - Создать новый проект
- `PUT /api/projects/:id` - Обновить проект
- `DELETE /api/projects/:id` - Удалить проект

## Интеграция с фронтендом

В твоих HTML файлах замени localStorage на API calls:

```javascript
// Вместо localStorage
const projects = JSON.parse(localStorage.getItem('devai_projects') || '[]');

// Используй fetch
const response = await fetch('http://localhost:3000/api/projects', {
  credentials: 'include'
});
const projects = await response.json();
```

## Структура проекта

```
.
├── config/
│   └── passport.js      # Passport OAuth конфигурация
├── routes/
│   ├── auth.js          # Роуты авторизации
│   ├── user.js          # Роуты пользователя
│   └── projects.js      # Роуты проектов
├── server.js            # Главный файл сервера
├── package.json
├── .env.example
└── README.md
```

## TODO

- [ ] Добавить MongoDB/PostgreSQL вместо in-memory storage
- [ ] Добавить rate limiting
- [ ] Добавить HTTPS в production
- [ ] Добавить email verification
- [ ] Добавить password reset
- [ ] Добавить 2FA
