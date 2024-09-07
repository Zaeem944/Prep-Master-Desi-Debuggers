"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/State/store';
import { login } from '@/State/UserSlice';
import InputField from '@/GlobalComponents/InputField'; // Ensure this component exists and works
import LoginButton from '@/GlobalComponents/LoginButton';
import Notification from '@/GlobalComponents/Notification';
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation for Next.js routing

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

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
    dispatch(login({ name: userData.name, role: userData.role, isVerified: true }));

    console.log(`User: ${userData.name} has logged in as a ${userData.role}`);

    setSuccess(true);
    setNotificationTitle('Success!');
    setNotificationDescription('You have successfully logged in!');
    setShowNotification(true);

    if (userData.role === 'teacher' && !userData.isVerified) {
      router.push('/Teacher/NotVerified'); // Redirect to "NotVerified" page for teachers
    } else {
      router.push('/Teacher/IsVerified'); // Redirect to home or another default page
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

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
          <LoginButton text="Login" onClick={handleLogin} />
        </form>
      </div>
    </>
  );
};

export default LoginPage;
