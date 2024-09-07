"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/State/store';
import { useSelector } from 'react-redux';

const StartTest = () => {
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { email } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchPurchasedTests = async () => {
            try {
                const response = await fetch(`http://localhost:8000/test/checkPurchased`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setTests(data);
                } else {
                    throw new Error('Failed to fetch purchased tests');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedTests();
    }, [email]);

    const handleStartTest = (title: string) => {
        router.push(`/Student/StartTest/StartQuesstionaire?title=${title}`); // Adjust the route as needed
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Your Purchased Tests</h1>
            <ul>
                {tests.map((test) => (
                    <li key={test._id}>
                        <h2>{test.title}</h2>
                        <button onClick={() => handleStartTest(test.title)}>Start Test</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StartTest;
