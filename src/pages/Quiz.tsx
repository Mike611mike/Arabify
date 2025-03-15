
import React from 'react';
import QuizMode from '../components/QuizMode';

const Quiz = () => {
  return (
    <div className="container max-w-md mx-auto px-4 pb-24 pt-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1 animate-fade-in">Quiz Mode</h1>
        <p className="text-spotify-text animate-fade-in">Test your knowledge by date or review all sentences</p>
      </header>

      <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <QuizMode />
      </div>
    </div>
  );
};

export default Quiz;
