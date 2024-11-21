import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AuthWindow from './AuthWindow';
import ProfilePage from './ProfilePage';
import AboutPage from './AboutPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/MainWindow.css';

function MainWindow() {
  const [authStatus, setAuthStatus] = useState(false);
  const [isAuthVisible, setIsAuthVisible] = useState(false); // Управление видимостью окна авторизации

  const handleAuthClick = () => {
    setIsAuthVisible(true);
  };

  const closeAuthWindow = () => {
    setIsAuthVisible(false);
  };

  return (
    <div className="main-window">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Tazy Polit
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
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleAuthClick}
                  >
                    Авторизация
                  </button>
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
                        localStorage.removeItem('token');
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

      {/* Hero Section */}
      <div className="hero-section">
        {/* Левая часть с текстом */}
        <div className="leftContent">
          <div className="bubble bubble-left">
            <p>
            "Tazy Polit" — уникальный политический сервер в мире Minecraft, который сочетает в себе элементы управления, экономики и гражданского общества с использованием мода Create и других увлекательных модификаций. На этом сервере игроки могут создавать свои собственные государства, участвовать в выборах, формировать правительства и взаимодействовать с экономическими системами, основанными на механике модов.
            </p>
          </div>
          <div className="bubble bubble-right">
            <p>
              Используя мод Create, участники могут проектировать сложные механизмы и автоматизации, которые помогут в производстве ресурсов и развитии инфраструктуры своих наций. Это открывает возможности для создания уникальных торговых путей, производственных мощностей и даже систем управления. Кроме того, на сервере действуют правила, позволяющие игрокам взаимодействовать друг с другом в рамках политических решений, законов и дипломатии.
            </p>
          </div>
          <div className="bubble bubble-bottom">
            <p>
              
              "Tazy Polit" предлагает не только игровую механику, но и атмосферу активного общения и сотрудничества, что делает его идеальным местом для творческих и амбициозных игроков, стремящихся воплотить свои идеи в жизнь. Присоединяйтесь к "Tazy Polit" и создайте свою политическую историю в мире Minecraft!
            </p>
          </div>
        </div>

        {/* Правая часть с кнопками */}
        <div className="rightContent">
          <div className="center-content">
            <button className="btn btn-primary btn-lg main-button" onClick={handleAuthClick}>ВОЙТИ</button>
            <div className="sub-buttons">
              <button className="btn btn-secondary btn-sm">автовход</button>
              <button className="btn btn-secondary btn-sm">Сохранить пароль</button>
            </div>
          </div>
        </div>
      </div>
      {/* AuthWindow */}
      {isAuthVisible && (
      <div className="auth-window-overlay">
        <div className="auth-window-container">
          <AuthWindow setAuthStatus={setAuthStatus} />
          <button
            className="btn btn-secondary close-auth-btn"
            onClick={closeAuthWindow}
          >
            Закрыть
          </button>
        </div>
      </div>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default MainWindow;