
import React from 'react';
import { useSentences } from '../context/SentencesContext';
import { Loader2, Star, ChevronLeft } from 'lucide-react';
import SentenceCard from '@/components/SentenceCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Favorites = () => {
  const { sentences, isLoading } = useSentences();
  
  // Get favorite sentences
  const favoriteSentences = sentences.filter(sentence => sentence.favorite);

  return (
    <div className="container max-w-md mx-auto px-4 pb-24 pt-6">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold animate-fade-in">Favorite Sentences</h1>
        </div>
        <p className="text-spotify-text animate-fade-in">All your saved favorite Arabic phrases</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 size={32} className="animate-spin text-spotify-green" />
        </div>
      ) : favoriteSentences.length === 0 ? (
        <div className="text-center py-8 bg-spotify-light bg-opacity-20 rounded-lg">
          <Star className="mx-auto mb-2 text-spotify-text opacity-50" size={32} />
          <p className="text-spotify-text">No favorite sentences yet</p>
          <p className="text-spotify-text text-sm mt-1">Mark sentences as favorite when reviewing</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favoriteSentences.map((sentence) => (
            <SentenceCard 
              key={sentence.id} 
              sentence={sentence} 
              showActions={true}
              hideMetadata={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
