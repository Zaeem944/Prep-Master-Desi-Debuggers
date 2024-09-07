"use client";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/State/store';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const CreateTestSeriesPage = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', op1: '', op2: '', op3: '', op4: '', isCorrect: '' }]);
  const [price, setPrice] = useState(0);
  const [purchasedBy, setPurchasedBy] = useState('');
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

  const addQuestion = () => {
    setQuestions([...questions, { question: '', op1: '', op2: '', op3: '', op4: '', isCorrect: '' }]);
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    const testSeries = {
      title,
      questions,
      price,
      purchasedBy,
    };

    try {
      const response = await fetch('http://localhost:8000/test/createTest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testSeries),
      });

      if (response.ok) {
        alert('Test Series created successfully!');
      } else {
        alert('Error creating test series.');
      }
    } catch (error) {
      console.error('Error creating test series:', error);
      alert('Error creating test series.');
    }
  };

  return (
    <div className='bg-gradient-to-br from-purple-500 to-indigo-600'>
    <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Welcome, {user.name}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
    
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        
        <h2 className="text-2xl font-semibold mb-4">Create New Test Series</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Test Series Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter test series title"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Set Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder="Enter price"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Purchased By:</label>
          <input
            type="text"
            value={purchasedBy}
            onChange={(e) => setPurchasedBy(e.target.value)}
            placeholder="Enter purchaser name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Question {index + 1}</h4>
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              placeholder="Enter question text"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              value={question.op1}
              onChange={(e) => handleQuestionChange(index, 'op1', e.target.value)}
              placeholder="Option 1"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              value={question.op2}
              onChange={(e) => handleQuestionChange(index, 'op2', e.target.value)}
              placeholder="Option 2"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              value={question.op3}
              onChange={(e) => handleQuestionChange(index, 'op3', e.target.value)}
              placeholder="Option 3"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              value={question.op4}
              onChange={(e) => handleQuestionChange(index, 'op4', e.target.value)}
              placeholder="Option 4"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              value={question.isCorrect}
              onChange={(e) => handleQuestionChange(index, 'isCorrect', e.target.value)}
              placeholder="Correct option (e.g., 'op1', 'op2')"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add Question
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Test Series
        </button>
      </div>
    </div>
    </div>
  );
};

export default CreateTestSeriesPage;
