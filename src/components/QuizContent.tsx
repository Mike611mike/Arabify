
import React from 'react';
import { Sentence } from '../context/SentencesContext';
import SentenceCard from './SentenceCard';
import QuizNavigation from './quiz/QuizNavigation';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { SentenceProgress } from '@/utils/localStorage';
import { Button } from './ui/button';
import { Smile, Meh, Frown, Eye } from 'lucide-react';
import { useTheme } from '@/context/providers/ThemeProvider';

interface QuizContentProps {
  currentSentence: Sentence;
  currentIndex: number;
  filteredSentences: Sentence[];
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
  showReviewMode?: boolean;
  onRateAnswer?: (quality: number) => void;
  selectedAnswerQuality?: number | null;
  progress?: SentenceProgress;
  onToggleMastered: (id: string, mastered: boolean) => Promise<void>;
  showTranslation?: boolean;
  onShowTranslation?: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({
  currentSentence,
  currentIndex,
  filteredSentences,
  loading,
  onPrev,
  onNext,
  showReviewMode = false,
  onRateAnswer,
  selectedAnswerQuality = null,
  progress,
  onToggleMastered,
  showTranslation = false,
  onShowTranslation
}) => {
  // Use the custom hook for keyboard navigation
  useKeyboardNavigation({
    onPrev,
    onNext,
    disabled: loading
  });

  const { isDarkMode } = useTheme();

  return (
    <>
      <QuizNavigation
        currentIndex={currentIndex}
        totalSentences={filteredSentences.length}
        loading={loading}
        onPrev={onPrev}
        onNext={onNext}
        currentSentence={currentSentence}
        onToggleMastered={onToggleMastered}
      />

      <div className="py-2">
        <SentenceCard 
          sentence={currentSentence} 
          hideEnglish={!showTranslation} 
          showActions={false} // Set to false to hide mastered/favorite toggles in SentenceCard
          className="transform transition-all duration-500"
          hideMetadata={true}
        />
      </div>

      {/* Show Answer Button - only show if translation is not yet revealed */}
      {!showTranslation && onShowTranslation && (
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onShowTranslation}
          >
            <Eye className="mr-2" size={16} />
            Show Answer
          </Button>
        </div>
      )}

      {/* Rating Buttons for Review Mode */}
      {showReviewMode && (
        <div className="mt-4">
          <p className={`text-sm mb-2 text-center ${isDarkMode ? 'text-spotify-text' : 'text-gray-600'}`}>
            How well did you know this sentence?
          </p>
          <div className="flex justify-between gap-2">
            <Button 
              variant={selectedAnswerQuality === 1 ? "default" : "outline"}
              className={`flex-1 ${selectedAnswerQuality === 1 ? "bg-red-600 hover:bg-red-700" : ""}`}
              onClick={() => onRateAnswer?.(1)}
            >
              <Frown className="mr-1" size={16} />
              Didn't Know
            </Button>
            <Button 
              variant={selectedAnswerQuality === 3 ? "default" : "outline"}
              className={`flex-1 ${selectedAnswerQuality === 3 ? "bg-yellow-600 hover:bg-yellow-700" : ""}`}
              onClick={() => onRateAnswer?.(3)}
            >
              <Meh className="mr-1" size={16} />
              Partial
            </Button>
            <Button 
              variant={selectedAnswerQuality === 5 ? "default" : "outline"}
              className={`flex-1 ${selectedAnswerQuality === 5 ? "bg-spotify-green hover:bg-opacity-90" : ""}`}
              onClick={() => onRateAnswer?.(5)}
            >
              <Smile className="mr-1" size={16} />
              Perfect
            </Button>
          </div>
        </div>
      )}

      {/* Show progress info if available */}
      {showReviewMode && progress && (
        <div className={`mt-4 text-xs p-2 rounded-md ${
          isDarkMode 
            ? 'text-spotify-text bg-spotify-light bg-opacity-30' 
            : 'text-gray-600 bg-gray-100'
        }`}>
          <p>Reviews: {progress.repetitions} | Last: {new Date(progress.lastPracticed).toLocaleDateString()}</p>
          <p>Correct: {progress.correct} | Incorrect: {progress.incorrect}</p>
        </div>
      )}
    </>
  );
};

export default QuizContent;
