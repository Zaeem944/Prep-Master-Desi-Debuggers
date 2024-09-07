"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/State/store';
import { login } from '@/State/UserSlice';
import InputField from '@/GlobalComponents/InputField'; // Ensure this component exists and works
import LoginButton from '@/GlobalComponents/LoginButton';
import Notification from '@/GlobalComponents/Notification';
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation for Next.js routing
import { useSocket } from '../SocketContext';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { socket } = useSocket();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setSuccess(false);
      setNotificationTitle('Error!');
      setNotificationDescription('Please fill in all fields!');
      setShowNotification(true);
      return;
    }

    // Perform login logic here
    // Example: Sending login request to the server
    const response = await fetch('http://localhost:8000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setSuccess(false);
      setNotificationTitle('Error!');
      setNotificationDescription('Login failed. Please check your credentials.');
      setShowNotification(true);
      return;
    }

    const userData = await response.json();

    // Dispatch login action
    dispatch(login({ name: userData.name, role: userData.role, isVerified: userData.isVerified , email: userData.email}));

    socket?.emit('login', userData);

    console.log(`User: ${userData.name} has logged in as a ${userData.role}, verified: ${userData.isVerified}`);

    setSuccess(true);
    setNotificationTitle('Success!');
    setNotificationDescription('You have successfully logged in!');
    setShowNotification(true);

    if(userData.role =='student'){
      router.push('/Student')
    } else if (userData.role === 'teacher' && !userData.isVerified) {
      router.push('/Teacher/NotVerified'); 
    } else if (userData.role === 'teacher' && userData.isVerified) {
      router.push('/Teacher/IsVerified');
    } else if (userData.role === 'admin') {
      router.push('/Admin');
    }
    
  };

  return (
    <>
      {/* Notification */}
      {showNotification && (
        <Notification
          title={notificationTitle}
          description={notificationDescription}
          success={success}
          setShowNotification={setShowNotification}
        />
      )}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <h1 className="text-3xl font-bold text-center text-white my-4">welcome to Prep Master</h1>
      <h2 className="text-2xl font-bold text-center text-white my-4">World's 322nd Best Test Prep Website</h2>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-8 rounded shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* Email Input */}
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <div className="mt-4">
          <LoginButton text="Login" onClick={handleLogin} />
          </div>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <Link href="/">
              <p>Don't have an account? <span className="text-blue-500 hover:underline">Register here.</span></p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
