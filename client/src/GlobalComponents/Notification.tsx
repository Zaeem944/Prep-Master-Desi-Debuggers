"use client"
import React, { useEffect, useState } from 'react';

interface NotificationProps {
  title: string;
  description: string;
  success: boolean;
  setShowNotification: (show: boolean) => void;
}

const Notification: React.FC<NotificationProps> = ({ title, description, success, setShowNotification }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Start the dropdown animation
    setShow(true);

    // Set timeout to hide the notification after 3 seconds
    const timer = setTimeout(() => {
      setShow(false);
      setShowNotification(false);
    }, 3000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${
        show ? 'translate-y-0' : '-translate-y-full'
      } transition-transform duration-1500 ease-in-out w-1/2 max-w-lg bg-gray-400 text-black p-4 rounded shadow-lg text-center`}
    >
      <h3 className={`font-bold text-lg ${success ? 'text-green-500' : 'text-red-500'}`}>
        {title}
      </h3>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default Notification;

