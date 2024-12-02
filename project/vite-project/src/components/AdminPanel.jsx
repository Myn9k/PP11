import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Загружаем пользователей при первом рендере
  useEffect(() => {
    fetchUsers();
  }, []);

  // Получаем список пользователей
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUsers(data.users);
  };

  // Добавляем нового пользователя
  const handleAddUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  // Удаляем пользователя
  const handleDeleteUser = async (email) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/users/${email}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter(user => user.email !== email));
  };

  // Редактируем пользователя
  const handleEditUser = (updatedUser) => {
    setUsers(users.map(user => user.email === updatedUser.email ? updatedUser : user));
  };

  return (
    <div>
      <h1>Админ-панель</h1>
      <UserForm onSubmit={handleAddUser} />
      <UserList
        users={users}
        onDelete={handleDeleteUser}
        onEdit={setSelectedUser}
      />
      {selectedUser && <UserForm user={selectedUser} onSubmit={handleEditUser} />}
    </div>
  );
};

export default AdminPanel;
