"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/State/store';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

const StartQuestionnaire = () => {
    const [test, setTest] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
    const [score, setScore] = useState(0);
    const router = useRouter();
    const { email } = useSelector((state: RootState) => state.user);
    const searchParams = useSearchParams();
    const title = searchParams.get("title");

    useEffect(() => {
        const fetchTestDetails = async () => {
            if (typeof title === 'string') {
                try {
                    const response = await fetch(`http://localhost:8000/test/getTestDetails`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ title: title }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setTest(data);
                    } else {
                        throw new Error('Failed to fetch test details');
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchTestDetails();
    }, [title]);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const calculateScore = () => {
        let totalScore = 0;
        test.questions.forEach((question: any) => {
            if (answers[question._id] === question.isCorrect) {
                totalScore += 1;
            }
        });
        return totalScore;
    };

    const handleSubmit = async () => {
        const finalScore = calculateScore();
        setScore(finalScore);

        try {
            const response = await fetch(`http://localhost:8000/test/submitTest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: test.title, email: email, highestMarks: finalScore }),
            });

            if (response.ok) {
                router.push('/Student');
            } else {
                throw new Error('Failed to submit test');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!test) {
        return <p>Test not found</p>;
    }

    return (
        <div>
            <h1>{test.title}</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {test.questions.map((question: any) => (
                    <div key={question._id}>
                        <h3>{question.question}</h3>
                        {['op1', 'op2', 'op3', 'op4'].map((option) => (
                            <div key={option}>
                                <input
                                    type="radio"
                                    name={question._id}
                                    value={option}
                                    checked={answers[question._id] === option}
                                    onChange={() => handleAnswerChange(question._id, option)}
                                />
                                <label>{question[option]}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit Test</button>
            </form>
        </div>
    );
};

export default StartQuestionnaire;