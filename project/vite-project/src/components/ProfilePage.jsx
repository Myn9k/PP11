import React, { useEffect, useState } from "react";
import { loadUserProfile } from "./scripts/profile"; // Импорт функции
import './css/Profile.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // Состояние для данных профиля
  const [error, setError] = useState(null); // Состояние для ошибки

  useEffect(() => {
    const token = localStorage.getItem("token"); // Получаем токен из локального хранилища

    if (!token) {
      setError("Вы не авторизованы. Пожалуйста, войдите в систему.");
      return;
    }

    // Загрузка данных профиля
    loadUserProfile(token)
      .then(data => {
        if (data) {
          setProfile(data); // Устанавливаем данные профиля
        } else {
          setError("Не удалось загрузить данные профиля.");
        }
      })
      .catch(() => {
        setError("Произошла ошибка при загрузке данных.");
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profile) {
    return <div>Загрузка профиля...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Профиль</h1>
        </div>
        <div className="profile-info">
          <p>
            <strong>Никнейм:</strong> <span id="username">{profile.username}</span>
          </p>
          <p>
            <strong>Электронная почта:</strong> <span id="email">{profile.email}</span>
          </p>
          <button className="main-button">Выйти</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
