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
  const [Tests, setTests] = useState<any[]>([]); // Change to 'any[]' to handle data structure

  if (!user || !user.isLoggedIn) {
    router.push('/Login');
  }

  useEffect(() => {
    const fetchTests = async () => {
      const response = await fetch('http://localhost:8000/test/getTestDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'Advanced Physics' }) // Optionally pass a specific title if needed
      });

      if (!response.ok) {
        console.log('Error fetching tests');
        return;
      }

      const data = await response.json();
      setTests(data); // Assuming this is an array of test data
      console.log(data);
    };

    fetchTests();
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/Login');
    window.location.reload();
  };

  return (
    <div className='bg-gradient-to-br from-purple-500 to-indigo-600'>
      <h1 className="text-3xl font-bold text-center text-white">Welcome, {user.name}</h1>
      
      <div className="flex flex-row justify-around space-x-12 my-8">
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
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>

      {/* Display Tests and Reviews */}
      <div className="container mx-auto mt-8">
        {Tests && Tests.length > 0 ? (
          Tests.map((test: any) => (
            <div key={test.title} className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{test.title}</h2>
              {test.reviews && test.reviews.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-700">Reviews:</h3>
                  {test.reviews.map((review: any, index: number) => (
                    <div key={index} className="mt-2 border p-3 rounded">
                      <h4 className="text-lg font-medium text-gray-800">{review.title}</h4>
                      <p className="text-sm text-gray-600">Rating: {review.reviewValues} / 5</p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                        {review.comments.map((comment: string, idx: number) => (
                          <li key={idx}>{comment}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews available for this test.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-white text-center">No test data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
