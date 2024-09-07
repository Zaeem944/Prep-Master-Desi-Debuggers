"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/State/store';
import { useSocket } from '@/app/SocketContext';
import Notification from '@/GlobalComponents/Notification';
import { useDispatch } from 'react-redux';

const CheckIsVerifiedPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { socket } = useSocket();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/Login');
    window.location.reload();
  };


  // Get the user data from Redux store

  const user = useSelector((state: RootState) => state.user);
  if (!user || !user.isLoggedIn) {
    router.push('/Login');
  }
  
  console.log(`in NotVerified page, user: ${JSON.stringify(user)}`);

  useEffect(() => {
    // Simulate a loading delay if needed
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If the user is verified, redirect to the Create Test Series page
    if (!loading && user.isVerified) {
      router.push('/Teacher/IsVerified');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!socket) return; // Ensure socket is initialized

    const handleTeacherVerified = (teacherEmail: string) => {

      setSuccess(true);
      setNotificationTitle('Success!');
      setNotificationDescription(`${teacherEmail} has been verified.`);
      setShowNotification(true);
      router.push('/Teacher/IsVerified');
    };

    // Set up socket event listener
    socket.on('teacherVerified', handleTeacherVerified);


  }, [socket]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // If not verified, show a message
  if (!user.isVerified) {
    return (
        <>
        <Notification
            title={notificationTitle}
            description={notificationDescription}
            success={success}
            setShowNotification={setShowNotification}
        />


      <div className='bg-gradient-to-br from-purple-500 to-indigo-600'>
       <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Welcome, {user.name}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      </div>
        <p>Your account is currently not verified. Please await approval from the admin.</p>
      </div>
      </>
    );
  }

  return null;
};

export default CheckIsVerifiedPage;
