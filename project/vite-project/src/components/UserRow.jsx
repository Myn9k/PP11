import React from 'react';

const UserRow = ({ user, onDelete, onEdit }) => {
  const handleDelete = () => {
    fetch(`http://localhost:5000/api/users/${user.email}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(() => onDelete(user.email));
  };

  const handleEdit = () => {
    onEdit(user);
  };

  return (
    <tr>
      <td>{user.email}</td>
      <td>{user.username}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
