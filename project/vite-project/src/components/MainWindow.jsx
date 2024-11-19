import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AuthWindow from './AuthWindow';
import ProfilePage from './ProfilePage';
import AboutPage from './AboutPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/MainWindow.css';

function MainWindow() {
  const [authStatus, setAuthStatus] = useState(false);

  return (
    <div className="main-window bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Minesraft
          </Link>
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
              {!authStatus && (
                <li className="nav-item">
                  <Link className="nav-link" to="/auth">
                    Авторизация
                  </Link>
                </li>
              )}
              {authStatus && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Профиль
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      О нас
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link text-decoration-none"
                      onClick={() => {
                        setAuthStatus(false);
                        localStorage.removeItem('token'); // Удаляем токен
                      }}
                    >
                      Выйти
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
      <Route
          path="/"
          element={
            <>
              <header className="main-header text-center">
                <h1>Добро пожаловать в Minesraft</h1>
                <p>Исследуйте, творите и удивляйте!</p>
              </header>
              <section className="content text-center">
                <h2>Особенности нашего проекта</h2>
                <ul className="list-group mx-auto">
                  <li className="list-group-item">Игровой процесс без границ</li>
                  <li className="list-group-item">Полная свобода творчества</li>
                  <li className="list-group-item">Технологическая уникальность</li>
                </ul>
              </section>
            </>
          }
        />
        <Route path="/auth" element={<AuthWindow setAuthStatus={setAuthStatus} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default MainWindow;
