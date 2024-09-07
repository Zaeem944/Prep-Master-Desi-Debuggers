"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/State/store';
import { useSelector } from 'react-redux';


const PurchaseTest = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { email } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:8000/test/sendApproved');
        if (response.ok) {
          const data = await response.json();
          setTests(data);
        } else {
          throw new Error('Failed to fetch tests');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handlePurchase = async (testId: string) => {
    try {
      const response = await fetch(`/api/purchaseTest/${testId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        router.push('/TestPage');
      } else {
        throw new Error('Failed to purchase test');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Available Tests</h1>
      <ul>
        {tests.map((test) => (
          <li key={test._id}>
            <h2>{test.title}</h2>
            <p>Price: ${test.price}</p>
            <button onClick={() => handlePurchase(test._id)}>Purchase Test</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseTest;
