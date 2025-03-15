import React from 'react';
import { Trash2, CheckCircle2, Star } from 'lucide-react';
import { Sentence, useSentences } from '../context/SentencesContext';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/context/providers/ThemeProvider';

interface SentenceCardProps {
  sentence: Sentence;
  hideEnglish?: boolean;
  showActions?: boolean;
  className?: string;
  style?: React.CSSProperties;
  hideMetadata?: boolean;
}

const SentenceCard: React.FC<SentenceCardProps> = ({ 
  sentence, 
  hideEnglish = false, 
  showActions = true,
  className,
  style,
  hideMetadata = false
}) => {
  const { removeSentence, toggleMastered, toggleFavorite } = useSentences();
  const { isDarkMode } = useTheme();

  const handleToggleMastered = () => {
    toggleMastered(sentence.id, !sentence.mastered);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(sentence.id, !sentence.favorite);
  };

  return (
    <div 
      className={cn(
        'spotify-card glass-card animate-fade-in relative overflow-hidden',
        sentence.mastered && 'border-l-4 border-l-green-500',
        sentence.favorite && 'border-r-4 border-r-yellow-500',
        className
      )}
      style={style}
    >
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {sentence.favorite && (
          <div className="text-yellow-500 flex items-center gap-1">
            <Star size={16} fill="currentColor" />
            <span className="text-xs font-medium">Favorite</span>
          </div>
        )}
        {sentence.mastered && (
          <div className="text-green-500 flex items-center gap-1">
            <CheckCircle2 size={16} />
            <span className="text-xs font-medium">Mastered</span>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <div className={`arabic-text text-xl mb-2 font-arabic ${isDarkMode ? 'text-sentence-arabic' : 'text-sentence-light-arabic'}`}>
          {sentence.arabic}
        </div>
        <div className={`font-medium ${isDarkMode ? 'text-sentence-phonetic' : 'text-sentence-light-phonetic'}`}>
          {sentence.spokenArabic}
        </div>
      </div>

      {!hideEnglish && (
        <div className={`mt-2 transition-all duration-300 animate-fade-in ${isDarkMode ? 'text-sentence-english' : 'text-sentence-light-english'}`}>
          {sentence.english}
        </div>
      )}

      {showActions && (
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-spotify-light">
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id={`mastered-${sentence.id}`}
                      checked={sentence.mastered}
                      onCheckedChange={handleToggleMastered}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <label 
                      htmlFor={`mastered-${sentence.id}`}
                      className={`text-sm cursor-pointer ${isDarkMode ? 'text-spotify-text' : 'text-gray-600'}`}
                    >
                      Mastered
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark as mastered when you know this well</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id={`favorite-${sentence.id}`}
                      checked={sentence.favorite}
                      onCheckedChange={handleToggleFavorite}
                      className="data-[state=checked]:bg-yellow-500"
                    />
                    <label 
                      htmlFor={`favorite-${sentence.id}`}
                      className={`text-sm flex items-center ${isDarkMode ? 'text-spotify-text' : 'text-gray-600'}`}
                    >
                      {sentence.favorite && <Star size={12} className="mr-1 text-yellow-500" fill="currentColor" />}
                      Favorite
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to favorites for quick access</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <button
            onClick={() => removeSentence(sentence.id)}
            className={`transition-colors duration-200 ${isDarkMode ? 'text-spotify-text hover:text-red-500' : 'text-gray-600 hover:text-red-500'}`}
            aria-label="Delete sentence"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}

      {!hideMetadata && (
        <div className={`mt-3 pt-3 border-t border-spotify-light text-sm ${isDarkMode ? 'text-spotify-text' : 'text-gray-600'}`}>
          <div className="mb-2">
            <span className="font-semibold">Added:</span>{' '}
            {new Date(sentence.createdAt).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Sentence ID:</span>{' '}
            {sentence.id}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Status:</span>{' '}
            {sentence.mastered ? 'Mastered' : 'Learning'}{sentence.favorite ? ', Favorite' : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export default SentenceCard;
