import React, { useState, useEffect } from 'react';

const Device = () => {
  const [devices, setDevices] = useState([]);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Получение списка устройств при загрузке страницы
  useEffect(() => {
    fetch('/api/devices', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.devices) {
          setDevices(data.devices);
        } else {
          setError('Не удалось загрузить устройства.');
        }
      })
      .catch(() => setError('Ошибка при загрузке устройств.'));
  }, []);

  // Добавление нового устройства
  const handleAddDevice = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    fetch('/api/devices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name: newDeviceName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.device) {
          setDevices((prevDevices) => [...prevDevices, data.device]);
          setNewDeviceName('');
          setSuccess('Устройство успешно добавлено.');
        } else {
          setError(data.message || 'Ошибка при добавлении устройства.');
        }
      })
      .catch(() => setError('Ошибка сети.'));
  };

  return (
    <div className="container mt-5">
      <h1>Мои устройства</h1>

      {/* Ошибки и уведомления */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Таблица устройств */}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Название устройства</th>
            <th>Дата добавления</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <tr key={device.id}>
              <td>{index + 1}</td>
              <td>{device.name}</td>
              <td>{new Date(device.addedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Форма добавления устройства */}
      <form onSubmit={handleAddDevice} className="mt-4">
        <div className="mb-3">
          <label htmlFor="deviceName" className="form-label">
            Название устройства
          </label>
          <input
            type="text"
            id="deviceName"
            className="form-control"
            value={newDeviceName}
            onChange={(e) => setNewDeviceName(e.target.value)}
            placeholder="Введите название устройства"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Добавить устройство
        </button>
      </form>
    </div>
  );
};

export default Device;
