"use client";

import { useRouter } from 'next/navigation';

const TestPage = () => {
  const router = useRouter();

  const handlePurchaseTest = () => {
    router.push('/Student/PurchaseTest');
  };

  const handleStartTest = () => {
    router.push('/Student/StartTest');
  };

  return (
    <div>
      <h1>Test Options</h1>
      <button onClick={handlePurchaseTest}>Purchase Test</button>
      <button onClick={handleStartTest}>Start Test</button>
    </div>
  );
};

export default TestPage;
