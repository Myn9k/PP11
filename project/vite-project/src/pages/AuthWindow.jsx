import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthWindow({ setAuthStatus }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Используем useNavigate для переходов

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (isRegistering && password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    setLoading(true);

    const url = isRegistering ? 'http://localhost:5000/api/register' : 'http://localhost:5000/api/login';
    const body = isRegistering
      ? { email, password: password, username }
      : { email, password: password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Не удалось выполнить запрос');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setAuthStatus(true);

      // Переход на главную страницу с передачей authStatus
      navigate('/', { state: { authStatus: true } });
    } catch (error) {
      setErrorMessage(error.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-window container mt-5 p-4 text-light rounded shadow-lg">
      <h2 className="text-center mb-4">{isRegistering ? 'Регистрация' : 'Авторизация'}</h2>
      {errorMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div className="form-group mb-3">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isRegistering && (
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Повторите ваш пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-secondary w-100" disabled={loading}>
          {loading ? 'Загрузка...' : isRegistering ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-link text-decoration-none"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage('');
            setPassword('');
            setConfirmPassword('');
            setUsername('');
          }}
        >
          {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </button>
      </div>
    </div>
  );
}

export default AuthWindow;
