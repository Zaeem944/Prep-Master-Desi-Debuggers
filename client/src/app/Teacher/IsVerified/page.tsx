"use client";
import { useState } from 'react';

const CreateTestSeriesPage = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', op1: '', op2: '', op3: '', op4: '', isCorrect: '' }]);
  const [price, setPrice] = useState(0);
  const [purchasedBy, setPurchasedBy] = useState('');

  // Handler to add a new empty question
  const addQuestion = () => {
    setQuestions([...questions, { question: '', op1: '', op2: '', op3: '', op4: '', isCorrect: '' }]);
  };

  // Handler to update question details
  const handleQuestionChange = (index: number, field: string, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  // Handler for submitting the form
  const handleSubmit = async () => {
    const testSeries = {
      title,
      questions,
      price,
      purchasedBy,
    };

    try {
      const response = await fetch('/api/testSeries', {
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
    <div>
      <h1>Welcome Teacher</h1>
        <h2>Create New test Series</h2>
      <div>
        <label>Test Series Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter test series title"
        />
      </div>

      {/* Input for price */}
      <div>
        <label>Set Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          placeholder="Enter price"
        />
      </div>

      {/* Purchased By */}
      <div>
        <label>Purchased By:</label>
        <input
          type="text"
          value={purchasedBy}
          onChange={(e) => setPurchasedBy(e.target.value)}
          placeholder="Enter purchaser name"
        />
      </div>

      {/* Render questions */}
      {questions.map((question, index) => (
        <div key={index}>
          <h4>Question {index + 1}</h4>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            placeholder="Enter question text"
          />
          <input
            type="text"
            value={question.op1}
            onChange={(e) => handleQuestionChange(index, 'op1', e.target.value)}
            placeholder="Option 1"
          />
          <input
            type="text"
            value={question.op2}
            onChange={(e) => handleQuestionChange(index, 'op2', e.target.value)}
            placeholder="Option 2"
          />
          <input
            type="text"
            value={question.op3}
            onChange={(e) => handleQuestionChange(index, 'op3', e.target.value)}
            placeholder="Option 3"
          />
          <input
            type="text"
            value={question.op4}
            onChange={(e) => handleQuestionChange(index, 'op4', e.target.value)}
            placeholder="Option 4"
          />
          <input
            type="text"
            value={question.isCorrect}
            onChange={(e) => handleQuestionChange(index, 'isCorrect', e.target.value)}
            placeholder="Correct option (e.g., 'op1', 'op2')"
          />
        </div>
      ))}

      {/* Button to add more questions */}
      <button onClick={addQuestion}>Add Question</button>

      {/* Submit button */}
      <button onClick={handleSubmit}>Create Test Series</button>
    </div>
  );
};

export default CreateTestSeriesPage;
