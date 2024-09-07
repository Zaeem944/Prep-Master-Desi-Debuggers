"use client";
import React, { useState, useEffect } from 'react';
import { useSocket } from '@/app/SocketContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/State/store';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';


const ApproveTests: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]); // Use an appropriate type for tests
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
    const fetchUnapproved = async () => {
      const response = await fetch('http://localhost:8000/test/sendUnApproved', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        console.log('Error fetching tests');
        return;
      }

      const data = await response.json();
      setTests(data);
      console.log(data);
    };

    fetchUnapproved();
  }, []);

  const handleApprove = async (title: string) => {
    // Perform verification logic here
    const response = await fetch(`http://localhost:8000/test/approveTest/${title}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Optionally, update the UI or refetch the list
      console.log('Test Approved verified successfully');
    } else {
      console.log('Error approving test');
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-4">Unapproved Tests</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      </div>
      <ul className="space-y-4">
        {tests.map((test) => (
          <li key={test.title} className="flex items-center justify-between p-4 border rounded shadow-md">
            <div>
              <p className="font-semibold">{test.title }</p>
              <p className="text-gray-600">{test.teacherEmail}</p>
            </div>
            <button
              onClick={() => handleApprove(test.title)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApproveTests;
