import React from 'react';
import UserRow from './UserRow';

const UserList = ({ users, onDelete, onEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserRow
            key={user.email}
            user={user}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
