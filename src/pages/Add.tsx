
import React from 'react';
import AddSentenceForm from '../components/AddSentenceForm';
import BulkUpload from '../components/BulkUpload';
import PasteInput from '../components/PasteInput';

const Add = () => {
  return (
    <div className="container max-w-md mx-auto px-4 pb-24 pt-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1 animate-fade-in">Add Sentences</h1>
        <p className="text-spotify-text animate-fade-in">Save new Levantine Arabic phrases to your collection</p>
      </header>

      <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <BulkUpload />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '125ms' }}>
        <PasteInput />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
        <AddSentenceForm />
      </div>

      <div className="mt-8 bg-spotify-light p-5 rounded-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
        <h3 className="text-lg font-medium mb-2">Input Format</h3>
        <ol className="text-spotify-text space-y-2 list-decimal list-inside">
          <li>Arabic: Original Arabic text (displayed right-to-left)</li>
          <li>English: The English translation</li>
          <li>Phonetic: How to pronounce it (transliteration)</li>
        </ol>
      </div>
    </div>
  );
};

export default Add;
