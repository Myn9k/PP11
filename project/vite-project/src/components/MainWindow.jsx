import React, { useState } from 'react';
import AuthWindow from './AuthWindow';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/MainWindow.css';

function MainWindow() {
  const [showAuth, setShowAuth] = useState(false);

  const handleAuthClick = () => {
    setShowAuth(true);
  };

  const handleBackClick = () => {
    setShowAuth(false);
  };

  return (
    <div className="main-window bg-dark">
      {/* Навбар */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container">
          <a className="navbar-brand" href="">Minesraft</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleAuthClick}>
                  Авторизация
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Контент */}
      {showAuth ? (
        <AuthWindow setAuthStatus={() => {}} onBack={handleBackClick} />
      ) : (
        <>
          {/* Заголовок */}
          <header className="main-header text-center">
            <h1>Добро пожаловать в Minesraft</h1>
            <p>Исследуйте, творите и удивляйте!</p>
          </header>

          {/* Основной контент */}
          <section className="content text-center">
            <h2>Особенности нашего проекта</h2>
            <ul className="list-group mx-auto">
              <li className="list-group-item">Игровой процесс без границ</li>
              <li className="list-group-item">Полная свобода творчества</li>
              <li className="list-group-item">Технологическая уникальность</li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

export default MainWindow;
