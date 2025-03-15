import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Brain, Loader2, Sun, Mountain, TreePalm, Star } from 'lucide-react';
import { useSentences } from '../context/SentencesContext';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { sentences, isLoading } = useSentences();
  
  // Get favorite sentences
  const favoriteSentences = sentences.filter(sentence => sentence.favorite);

  return (
    <div className="container max-w-md mx-auto px-4 pb-24 pt-6">
      <header className="text-center mb-8 animate-fade-in">
        <div className="relative h-52 mb-4">
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <AspectRatio ratio={16/9} className="w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-amber-200"></div>
              
              <div className="absolute top-6 right-8">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-yellow-300 opacity-30 animate-pulse-subtle"></div>
                  <Sun size={36} className="text-yellow-600" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  <path d="M0,250 L120,180 L200,220 L280,150 L390,210 L450,170 L580,240 L680,190 L750,220 L900,180 L900,300 L0,300 Z" 
                        fill="#e9b872" fillOpacity="0.6" />
                  <path d="M0,260 L70,230 L140,260 L210,200 L280,230 L350,210 L420,270 L490,230 L570,210 L650,240 L730,200 L800,270 L900,220 L900,300 L0,300 Z" 
                        fill="#e09f51" fillOpacity="0.7" />
                  <path d="M0,280 L60,260 L120,280 L180,260 L240,280 L300,250 L360,280 L420,260 L480,290 L540,270 L600,290 L660,260 L720,280 L780,260 L840,280 L900,250 L900,300 L0,300 Z" 
                        fill="#d68c36" fillOpacity="0.9" />
                </svg>
              </div>
              
              <div className="absolute bottom-16 left-16">
                <TreePalm size={42} className="text-green-700" />
              </div>
              <div className="absolute bottom-20 right-20">
                <TreePalm size={30} className="text-green-800" />
              </div>
              
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="h-8 w-16 bg-amber-800 rounded-sm transform rotate-6"></div>
                  <div className="absolute top-1 left-1 h-6 w-14 bg-amber-100 rounded-sm transform rotate-6 flex items-center justify-center">
                    <span className="text-xs text-amber-900 font-bold transform -rotate-6">العربية</span>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 bg-spotify-green rounded-full flex items-center justify-center">
                <BookOpen size={28} color="#000" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-1 text-spotify-black">Levantine Arabic</h1>
            <p className="text-spotify-black font-semibold">Learn Jordanian dialect with ease</p>
          </div>
        </div>
      </header>

      <div className="stats flex space-x-3 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="flex-1 bg-spotify-light rounded-lg p-4 text-center">
          <p className="text-spotify-text text-sm">Sentences</p>
          {isLoading ? (
            <div className="flex justify-center items-center h-8">
              <Loader2 size={20} className="animate-spin text-spotify-green" />
            </div>
          ) : (
            <p className="text-2xl font-bold">{sentences.length}</p>
          )}
        </div>
        <div className="flex-1 bg-spotify-light rounded-lg p-4 text-center">
          <p className="text-spotify-text text-sm">Last Added</p>
          {isLoading ? (
            <div className="flex justify-center items-center h-8">
              <Loader2 size={20} className="animate-spin text-spotify-green" />
            </div>
          ) : (
            <p className="text-2xl font-bold">
              {sentences.length > 0 
                ? new Date(sentences[0].createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                : '–'}
            </p>
          )}
        </div>
      </div>

      <div className="mb-8 animate-fade-in" style={{ animationDelay: '150ms' }}>
        <Link to="/favorites">
          <Button 
            className="w-full bg-spotify-green hover:bg-spotify-green/90 text-black mb-4 py-6"
          >
            <Star className="mr-2" fill="currentColor" /> 
            Favorite Sentences ({favoriteSentences.length})
          </Button>
        </Link>
      </div>

      <div className="space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <Link to="/review" className="spotify-card block p-5">
          <div className="flex items-center">
            <div className="bg-spotify-black bg-opacity-40 p-3 rounded-md mr-4">
              <BookOpen size={24} className="text-spotify-green" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Review Sentences</h2>
              <p className="text-spotify-text text-sm">Browse all saved phrases and their meanings</p>
            </div>
          </div>
        </Link>

        <Link to="/add" className="spotify-card block p-5">
          <div className="flex items-center">
            <div className="bg-spotify-black bg-opacity-40 p-3 rounded-md mr-4">
              <Plus size={24} className="text-spotify-green" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Add New Sentences</h2>
              <p className="text-spotify-text text-sm">Save new Arabic phrases to your collection</p>
            </div>
          </div>
        </Link>

        <Link to="/quiz" className="spotify-card block p-5">
          <div className="flex items-center">
            <div className="bg-spotify-black bg-opacity-40 p-3 rounded-md mr-4">
              <Brain size={24} className="text-spotify-green" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Quiz Mode</h2>
              <p className="text-spotify-text text-sm">Test your knowledge with interactive quizzes</p>
            </div>
          </div>
        </Link>
      </div>

      {!isLoading && sentences.length === 0 && (
        <div className="mt-8 p-5 rounded-lg bg-spotify-black bg-opacity-40 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          <p className="text-spotify-text mb-3">You haven't added any sentences yet</p>
          <Link to="/add" className="spotify-button inline-block">
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
