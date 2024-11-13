import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Для стилей Bootstrap

function AuthWindow({ setAuthStatus }) {
  // Состояния для email, password и флага регистрации
  const [email, setEmail] = useState(''); // Стейт для хранения email
  const [password, setPassword] = useState(''); // Стейт для хранения пароля
  const [isRegistering, setIsRegistering] = useState(false); // Флаг для переключения между регистрацией и авторизацией

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Отменяем стандартное поведение формы (перезагрузку страницы)

    // Определяем URL для запроса в зависимости от того, в режиме ли мы регистрации или авторизации
    const url = isRegistering ? '/api/register' : '/api/login';

    // Тело запроса с данными для авторизации или регистрации
    const body = {
      email,
      password,
    };

    // Отправляем запрос на сервер
    const response = await fetch(url, {
      method: 'POST', // Используем POST-запрос
      headers: {
        'Content-Type': 'application/json', // Указываем, что тело запроса в формате JSON
      },
      body: JSON.stringify(body), // Преобразуем объект в строку JSON
    });

    // Если запрос успешен, сохраняем токен в localStorage и обновляем состояние авторизации
    if (response.ok) {
      const data = await response.json(); // Получаем данные из ответа
      localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
      setAuthStatus(true); // Устанавливаем статус авторизации в true
    } else {
      // Если возникла ошибка, показываем alert
      alert('Ошибка авторизации или регистрации');
    }
  };

  return (
    <div className="auth-window container">
      {/* Заголовок, который меняется в зависимости от режима (регистрация или авторизация) */}
      <h2>{isRegistering ? 'Регистрация' : 'Авторизация'}</h2>

      {/* Форма для ввода данных */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Поле для ввода email */}
          <label htmlFor="email" style={{ color: 'white' }}>Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email} // Значение поля равно состоянию email
            onChange={(e) => setEmail(e.target.value)} // Обновляем состояние email при изменении
            required // Обязательное поле
          />
        </div>
        <div className="form-group">
          {/* Поле для ввода пароля */}
          <label htmlFor="password" style={{ color: 'white' }}>Пароль</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password} // Значение поля равно состоянию password
            onChange={(e) => setPassword(e.target.value)} // Обновляем состояние password при изменении
            required // Обязательное поле
          />
        </div>

        {/* Кнопка для отправки формы */}
        <button type="submit" className="btn btn-secondary">
          {isRegistering ? 'Зарегистрироваться' : 'Войти'} {/* Текст кнопки меняется в зависимости от режима */}
        </button>
      </form>

      {/* Кнопка для переключения между режимами авторизации и регистрации */}
      <button
        className="btn btn-link mt-3"
        onClick={() => setIsRegistering(!isRegistering)} // Переключаем состояние isRegistering
      >
        {isRegistering ? 'Есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'} {/* Текст кнопки зависит от состояния */}
      </button>
    </div>
  );
}

export default AuthWindow; // Экспортируем компонент для использования в других частях приложения
