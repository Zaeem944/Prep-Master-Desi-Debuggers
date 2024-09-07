"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/State/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AdminHome = () => {

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [Tests, setTests] = useState([]);

  if (!user || !user.isLoggedIn) {
    router.push('/Login');
  }

  useEffect(() => {

    const fetchTests = async () => {
      const response = await fetch('http://localhost:8000/test/getTestDetails', {
        method: 'POST',
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

    fetchTests();


  }, [])

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/Login');
    window.location.reload();
  }

  return (
    <div className='bg-gradient-to-br from-purple-500 to-indigo-600'>

      <h1 className="text-3xl font-bold text-center text-white">Welcome, {user.name}</h1>
      <div className="flex flex-row justify-around ">
      <div className="flex flex-row space-x-12">
        <Link href="/Admin/VerifyTeachers">
          <p className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Verify Teachers
          </p>
        </Link>
        <Link href="/Admin/ApproveTests">
          <p className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Approve Tests
          </p>
        </Link>

        </div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
      </div>
      
    </div>
  )
}

export default AdminHome
