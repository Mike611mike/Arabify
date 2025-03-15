
import { SentenceProgress } from '@/utils/localStorage';

export interface Sentence {
  id: string;
  arabic: string;
  english: string;
  spokenArabic: string;
  createdAt: number;
  mastered: boolean;
  favorite: boolean;
}

export interface SentencesContextType {
  sentences: Sentence[];
  addSentence: (arabic: string, english: string, spokenArabic: string) => Promise<Sentence | void>;
  bulkAddSentences: (sentences: Array<{arabic: string, english: string, spokenArabic: string}>) => Promise<Sentence[] | void>;
  removeSentence: (id: string) => Promise<void>;
  getRandomSentence: () => Sentence | null;
  toggleMastered: (id: string, mastered: boolean) => Promise<void>;
  toggleFavorite: (id: string, favorite: boolean) => Promise<void>;
  isLoading: boolean;
  // New properties for offline mode and spaced repetition
  isOffline: boolean;
  updateReviewProgress: (sentenceId: string, quality: number) => void;
  getSentencesDueForReview: () => Sentence[];
  sentenceProgress: Record<string, SentenceProgress>;
  stats: {
    learned: number;
    mastered: number;
    dueSoon: number;
    overdue: number;
    totalReviews: number;
    accuracy: number;
  };
}
