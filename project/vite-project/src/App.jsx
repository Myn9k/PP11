import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MainWindow from './components/MainWindow';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [authStatus, setAuthStatus] = useState(false); // Статус авторизации

  return (
    <Router>
      <MainWindow />
    </Router>
  );
}

export default App;
