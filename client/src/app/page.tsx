"use client";
import React, { useState } from 'react';
import InputField from '@/GlobalComponents/InputField';
import LoginButton from '@/GlobalComponents/LoginButton';
import Notification from '@/GlobalComponents/Notification';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupAs, setSignupAs] = useState('user');
  const [Success, setSuccess] = useState(false);
  const [NotificationTitle, setNotificationTitle] = useState('');
  const [NotificationDescription, setNotificationDescription] = useState('');
  const [ShowNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSuccess(false);
      setNotificationTitle('Error!');
      setNotificationDescription('Passwords do not match!');
      setShowNotification(true);
      return;
    }

    if (!name || !email || !password || !signupAs) {
      setSuccess(false);
      setNotificationTitle('Error!');
      setNotificationDescription('Please fill all the fields!');
      setShowNotification(true);
      return;
    }

    if (password.length < 8) {
      setSuccess(false);
      setNotificationTitle('Error!');
      setNotificationDescription('Password should be at least 6 characters long!');
      setShowNotification(true);
      return;
    }

    const id = Math.floor(Math.random() * 100000);

    const reponse = await fetch('/https://localhost:8000/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, email, password, role: signupAs }),
    });

    if (!reponse.ok) {
      setSuccess(false);
      setNotificationTitle('Error!');
      setNotificationDescription('Our server is down. Please try again later! or contact support');
      setShowNotification(true);
      return;
    }

    console.log({ name, email, password, signupAs });

    setSuccess(true);
    setNotificationTitle('Success!');
    setNotificationDescription('You have successfully signed up!');
    setShowNotification(true);
  };

  return (
    <>

    {/* Notification */}
    {ShowNotification && (
      <Notification
        title={NotificationTitle}
        description={NotificationDescription}
        success={Success}
        setShowNotification={setShowNotification}
      />
    )}

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Name Input */}
        <InputField
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


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

        {/* Confirm Password Input */}
        <InputField
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Signup As Input */}
        <div className="mb-4">
          <label htmlFor="signupAs" className="block text-gray-700 text-sm font-bold mb-2">
            Signup as
          </label>
          <select
            id="signupAs"
            value={signupAs}
            onChange={(e) => setSignupAs(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        {/* Submit Button */}
        <LoginButton text="Sign Up" onClick={handleSubmit}
        />
        
      </form>

     
    </div>

     
    </>
  );
};

export default SignupPage;
