"use client";
import React, { useState, useEffect } from 'react';

const VerifyTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]); // Use an appropriate type for teachers

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
      console.log('Teacher verified successfully');
      window.location.reload();
    } else {
      console.log('Error verifying teacher');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Unverified Teachers</h1>
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
