"use client";
import React, { useState, useEffect } from 'react';
import { useSocket } from '@/app/SocketContext';

const ApproveTests: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]); // Use an appropriate type for tests
  const { socket } = useSocket();

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
      window.location.reload();
    } else {
      console.log('Error approving test');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Unapproved Tests</h1>
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
