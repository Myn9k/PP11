import React from 'react';

function ProfilePage() {
  return (
    <div className="container text-light mt-5">
      <h1>Профиль</h1>
      <p>Добро пожаловать в ваш профиль!</p>
      <ul>
        <li><strong>Имя:</strong> Имя пользователя</li>
        <li><strong>Email:</strong> user@example.com</li>
        <li><strong>Статус:</strong> Активен</li>
      </ul>
    </div>
  );
}

export default ProfilePage;
