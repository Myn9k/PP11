import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // Импортируем motion из framer-motion
import ProfilePage from './ProfilePage';
import AboutPage from './AboutPage';
import AdminPanel from '../components/AdminPanel';
import Navbar from '../components/NavBar';

function MainPage() {
  const location = useLocation(); // Для определения текущего маршрута
  const [authStatus, setAuthStatus] = useState(false);
  const [isAuthVisible, setIsAuthVisible] = useState(false);

  // При загрузке проверяем токен в localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthStatus(true);
    }
  }, []);

  const handleAuthClick = () => {
    setIsAuthVisible(true);
  };

  const closeAuthWindow = () => {
    setIsAuthVisible(false);
  };

  // Проверка, является ли текущий маршрут специальным
  const isSpecialRoute = location.pathname === '/profile' || location.pathname === '/about';

  // Если маршрут "/admin", отображаем только админку
  if (location.pathname === '/admin') {
    return <AdminPanel />;
  }

  return (
    <div>
      <Navbar
        authStatus={authStatus}
        handleAuthClick={handleAuthClick}
        setAuthStatus={setAuthStatus}
      />

      <div className="relative h-screen bg-cover bg-center bg-[url('./assets/background.png')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Используем motion.div для анимации */}
        <motion.div
          className="flex items-center justify-center absolute inset-0 z-10 text-center text-white"
          initial={{ opacity: 0, y: 50 }} // Начальная позиция (не видим, сдвинут вниз)
          animate={{ opacity: 1, y: 0 }} // Конечная позиция (видим, на месте)
          transition={{ duration: 1, ease: "easeOut" }} // Параметры анимации
        >
          <div className="pt">
            <div className="font-bold text-5xl md:text-7xl leading-tight mb-4">
              TAZY POLIT
            </div>
            <div className="text-xl md:text-2xl mb-6">
              Лучший политический сервер в Minecraft
            </div>

            <div className="pt-20"></div>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="py-3 px-8 bg-blue-500 hover:bg-blue-700 rounded-full text-white font-semibold text-lg"
              >
                ИГРАТЬ
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MainPage;
