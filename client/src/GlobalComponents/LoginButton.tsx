import React from 'react';

interface LoginButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; 
}

const LoginButton: React.FC<LoginButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {text}
    </button>
  );
};

export default LoginButton;