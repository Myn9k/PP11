// node server.js в консоле но надо быть в директории my-server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const SECRET_KEY = '121212312414'; // Используйте надежный секретный ключ для токенов

// База данных в памяти (в продакшене используйте реальную базу данных)
const database = {};

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

// Регистрация пользователя
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (database[email]) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }
  // Хэширование пароля
  const passwordHash = await bcrypt.hash(password, 10);
  database[email] = { email, passwordHash };
  res.status(200).json({ message: 'Регистрация прошла успешно' });
});

// Авторизация пользователя
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = database[email];

  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }

  // Проверка пароля
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Неверный пароль' });
  }

  // Генерация JWT токена
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ message: 'Авторизация успешна', token });
});

// Проверка токена
app.get('/api/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ message: 'Доступ разрешен', email: decoded.email });
  } catch (error) {
    res.status(401).json({ message: 'Недействительный токен' });
  }
});

// Обработка маршрутов Vite
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
