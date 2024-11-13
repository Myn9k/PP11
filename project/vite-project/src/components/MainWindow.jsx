import React, { useState } from 'react'; // Импортируем React и хук useState для управления состоянием
import AuthWindow from './AuthWindow'; // Импортируем компонент окна авторизации
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем стили Bootstrap для компонента
import './css/MainWindow.css'; // Импортируем стили для главного окна

function MainWindow() {
  // Состояние для управления отображением окна авторизации
  const [showAuth, setShowAuth] = useState(false); 

  // Обработчик клика на ссылку "Авторизация"
  const handleAuthClick = () => {
    setShowAuth(true); // Показать окно авторизации
  };

  // Обработчик клика на кнопку "Назад" (для возврата в главное окно)
  const handleBackClick = () => {
    setShowAuth(false); // Скрыть окно авторизации и вернуться на главное окно
  };

  return (
    <div className="main-window">
      {/* Навигационная панель */}
      <div className='container-fluid'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            {/* Логотип или название сайта */}
            <a className="navbar-brand" href="">Minesraft</a>
            {/* Кнопка для мобильного меню */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {/* Ссылки в меню */}
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={handleAuthClick}>Авторизация</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>  

      {/* Условный рендеринг: если showAuth=true, показываем окно авторизации, иначе отображаем основное содержимое */}
      {showAuth ? (
        <AuthWindow setAuthStatus={() => {}} onBack={handleBackClick} /> // Отображаем компонент AuthWindow и передаем обработчик для кнопки "Назад"
      ) : (
        <>
          {/* Основной заголовок на главной странице */}
          <header className="main-header text-center p-3 mb-4">
            <h1>Добро пожаловать во что-то</h1>
            <p>Это краткое описание чего-то.</p>
          </header>
          <section className="content">
            {/* Список особенностей проекта */}
            <h2>Особенности нашего проекта:</h2>
            <ul className="list-group">
              <li className="list-group-item">обман номер 1</li>
              <li className="list-group-item">обман номер 2</li>
              <li className="list-group-item">обман номер 3</li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

export default MainWindow; // Экспортируем компонент MainWindow для использования в других частях приложения
