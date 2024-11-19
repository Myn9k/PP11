import React from 'react';

function ProfilePage() {
  return (
    <div className="container text-light mt-5">
      <h1>Профиль</h1>
      <p>Эта страница предназначена для отображения кого-то</p>
      <ul>
        <li><strong>Имя:</strong> Ваше имя</li>
        <li><strong>Email:</strong> example@example.com</li>
        <li><strong>Статус:</strong> Активный</li>
      </ul>
    </div>
  );
}

export default ProfilePage;
