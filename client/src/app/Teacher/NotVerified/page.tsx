"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/State/store';
import { useSocket } from '@/app/SocketContext';
import Notification from '@/GlobalComponents/Notification';

const CheckIsVerifiedPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { socket } = useSocket();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [success, setSuccess] = useState(false);

  // Get the user data from Redux store
  const { isVerified } = useSelector((state: RootState) => state.user);

  

  useEffect(() => {
    // Simulate a loading delay if needed
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If the user is verified, redirect to the Create Test Series page
    if (!loading && isVerified) {
      router.push('/Teacher/IsVerified');
    }
  }, [isVerified, loading, router]);

  useEffect(() => {
    if (!socket) return; // Ensure socket is initialized

    const handleTeacherVerified = (teacherEmail: string) => {
      setSuccess(true);
      setNotificationTitle('Success!');
      setNotificationDescription(`${teacherEmail} has been verified.`);
      setShowNotification(true);
    };

    // Set up socket event listener
    socket.on('teacherVerified', handleTeacherVerified);


  }, [socket]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // If not verified, show a message
  if (!isVerified) {
    return (
        <>
        <Notification
            title={notificationTitle}
            description={notificationDescription}
            success={success}
            setShowNotification={setShowNotification}
        />


      <div>
        <h1>Await Admin Approval</h1>
        <p>Your account is currently not verified. Please await approval from the admin.</p>
      </div>
      </>
    );
  }

  return null;
};

export default CheckIsVerifiedPage;
