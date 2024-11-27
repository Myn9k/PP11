// node server.js в консоле но надо быть в директории my-server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const SECRET_KEY = '121212312414'; // Используйте надежный секретный ключ для токенов

// База данных в памяти (для демонстрации)
const database = {};

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

// Регистрация пользователя
app.post('/api/register', async (req, res) => {
  const { email, password, username } = req.body;

  if (!username || username.trim() === '') {
    return res.status(400).json({ message: 'Имя пользователя обязательно' });
  }

  if (database[email]) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  database[email] = { email, passwordHash, username };

  // Генерация токена
  const token = jwt.sign({ email, username }, SECRET_KEY, { expiresIn: '1h' });

  console.log(database[email]);
  res.status(200).json({ message: 'Регистрация прошла успешно', token });
});

// Авторизация пользователя
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }

  const user = database[email];

  if (!user) {
    return res.status(401).json({ message: 'Пользователь не найден' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash); // Сравнение пароля

  if (!isMatch) {
    return res.status(401).json({ message: 'Неверный пароль' });
  }

  // Если пароль верный, генерируем токен
  const token = jwt.sign({ email: user.email, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ message: 'Авторизация успешна', token });
});

// Проверка токена и получение профиля
app.get('/api/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({
      message: 'Доступ разрешен',
      email: decoded.email,
      username: decoded.username // Возвращаем username
    });
  } catch (error) {
    res.status(401).json({ message: 'Недействительный токен' });
  }
});

// Получение списка всех пользователей
app.get('/api/users', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ users: Object.values(database) });
  } catch (error) {
    res.status(401).json({ message: 'Недействительный токен' });
  }
});

// Удаление пользователя по email
app.delete('/api/users/:email', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { email } = req.params;

    if (!database[email]) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    delete database[email];
    res.status(200).json({ message: 'Пользователь удален' });
  } catch (error) {
    res.status(401).json({ message: 'Недействительный токен' });
  }
});

// Редактирование пользователя по email
app.put('/api/users/:email', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { email } = req.params;
    const { username, password } = req.body;

    const user = database[email];
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.passwordHash = await bcrypt.hash(password, 10);
    }

    database[email] = user;
    
    console.log(database[email]);
    res.status(200).json({ message: 'Пользователь обновлен', user });
  } catch (error) {
    res.status(401).json({ message: 'Недействительный токен' });
  }
});

// Добавление нового пользователя
app.post('/api/users', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  if (database[email]) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  database[email] = { email, passwordHash, username };

  console.log(password);
  console.log(database[email]);
  res.status(200).json({ message: 'Пользователь добавлен' });
});

// Обработка маршрутов Vite (для фронтенд-приложения)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
