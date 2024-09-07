"use client";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/State/store';
import { login, logout } from '@/State/UserSlice';
import { useSocket } from './SocketContext';

const ExampleComponent: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const { socket } = useSocket();

  const handleLogin = () => {
    dispatch(login({ name: 'John Doe', role: 'Admin' }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>User Information</h1>
      {user.isLoggedIn ? (
        <>
          <p>Name: {user.name}</p>
          <p>Role: {user.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default ExampleComponent;
