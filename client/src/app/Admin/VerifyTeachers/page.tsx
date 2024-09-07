"use client";
import React, { useState, useEffect } from 'react';
import { useSocket } from '@/app/SocketContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/State/store';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const VerifyTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]); // Use an appropriate type for teachers
  const { socket } = useSocket();
const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user || !user.isLoggedIn) {
    router.push('/Login');
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/Login');
    window.location.reload();
  }



  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch('http://localhost:8000/user/getUnverified', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        console.log('Error fetching teachers');
        return;
      }

      const data = await response.json();
      setTeachers(data);
      console.log(data);
    };

    fetchTeachers();
  }, []);

  const handleVerify = async (teacherEmail: string) => {
    // Perform verification logic here
    const response = await fetch(`http://localhost:8000/user/verify/${teacherEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Optionally, update the UI or refetch the list
      setTeachers(teachers.filter(teacher => teacher.id !== teacherEmail));
      socket?.emit('teacherVerified', teacherEmail);
      console.log('Teacher verified successfully');
    } else {
      console.log('Error verifying teacher');
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-4">Unverified Teachers</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      </div>
      <ul className="space-y-4">
        {teachers.map((teacher) => (
          <li key={teacher.id} className="flex items-center justify-between p-4 border rounded shadow-md">
            <div>
              <p className="font-semibold">{teacher.name}</p>
              <p className="text-gray-600">{teacher.email}</p>
            </div>
            <button
              onClick={() => handleVerify(teacher.email)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Verify
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerifyTeachers;
