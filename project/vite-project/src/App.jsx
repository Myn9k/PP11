import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar';
import AuthWindow from './pages/AuthWindow';
import AdminPanel from './pages/AdminPanel';
import SocialAccountPage from './pages/SocialAccountPage';

function App() {
  const [authStatus, setAuthStatus] = useState(false); // Статус авторизации

  return (
    <Router>
      <Navbar authStatus={authStatus} /> {/* Навигационная панель */}
      <div className="pt-15"> {/* Контейнер для контента */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Передача setAuthStatus в AuthWindow */}
          <Route path="/register" element={<AuthWindow setAuthStatus={setAuthStatus} />} />
          <Route path="/social" element={<SocialAccountPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
