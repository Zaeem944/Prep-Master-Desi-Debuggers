"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/State/store';

const CheckIsVerifiedPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (loading) {
    return <p>Loading...</p>;
  }

  // If not verified, show a message
  if (!isVerified) {
    return (
      <div>
        <h1>Await Admin Approval</h1>
        <p>Your account is currently not verified. Please await approval from the admin.</p>
      </div>
    );
  }

  return null;
};

export default CheckIsVerifiedPage;
