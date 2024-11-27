import React, { useState, useEffect } from 'react';
import './css/Admin.css';

const UserForm = ({ user = null, onSubmit }) => {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.passwordHash || '');
  const [username, setUsername] = useState(user?.username || '');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { email, password, username };
    const apiUrl = user 
      ? `http://localhost:5000/api/users/${user.email}` 
      : 'http://localhost:5000/api/users';

    const method = user ? 'PUT' : 'POST';

    await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newUser),
    });

    onSubmit(newUser);
  };

  return (
    <form onSubmit={handleSubmit} className="forms">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">{user ? 'Save' : 'Add'} User</button>
    </form>
  );
};

export default UserForm;
