import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ authStatus }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800/50 shadow-md backdrop-blur-md z-50">
      <div className="flex items-center justify-between py-4 px-4">
        <a href="/" className="text-white text-2xl font-bold text-shadow">
          Tazy Polit
        </a>

        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="text-white hover:text-gray-300 uppercase text-sm font-semibold">
            О нас
          </Link>
          <Link to="/social" className="text-white hover:text-gray-300 uppercase text-sm font-semibold">
            Соц Сети
          </Link>
          <Link to="/faq" className="text-white hover:text-gray-300 uppercase text-sm font-semibold">
            FAQ
          </Link>
          <Link to="/rules" className="text-white hover:text-gray-300 uppercase text-sm font-semibold">
            Правила
          </Link>
          <a href="http://65.21.9.222:25626/" className="text-white hover:text-gray-300 uppercase text-sm font-semibold">
            Онлайн карта
          </a>

          {/* Условный рендеринг для кнопки */}
          {authStatus ? (
            <Link to="/profile" className="text-white hover:text-gray-300 uppercase text-sm font-semibold">
              Мой профиль
            </Link>
          ) : (
            <Link to="/register" className="text-white hover:text-gray-300 uppercase text-sm font-semibold">
              Регистрация
            </Link>
          )}
        </div>

        <button className="md:hidden text-white focus:outline-none" id="menu-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Мобильное меню */}
      <div className="md:hidden bg-gray-800/50 text-white space-y-2 px-6 py-4 hidden" id="mobile-menu">
        <Link to="/about" className="block hover:text-gray-300">
          О нас
        </Link>
        <Link to="/social" className="block hover:text-gray-300">
          Соц Сети
        </Link>
        <Link to="/faq" className="block hover:text-gray-300">
          FAQ
        </Link>
        <Link to="/rules" className="block hover:text-gray-300">
          Правила
        </Link>
        <a href="http://65.21.9.222:25626/" className="block hover:text-gray-300">
          Онлайн карта
        </a>

        {/* Условный рендеринг для кнопки в мобильном меню */}
        {authStatus ? (
          <Link to="/profile" className="block hover:text-gray-300">
            Мой профиль
          </Link>
        ) : (
          <Link to="/register" className="block hover:text-gray-300">
            Регистрация
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
