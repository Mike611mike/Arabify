
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SentencesProvider } from "./context/providers/SentencesProvider";
import { ThemeProvider } from "./context/providers/ThemeProvider";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Review from "./pages/Review";
import Add from "./pages/Add";
import Quiz from "./pages/Quiz";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import ThemeToggle from "./components/ThemeToggle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <SentencesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-spotify-dark text-spotify-white pb-16 dark:bg-black">
              <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
              </div>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/review" element={<Review />} />
                <Route path="/add" element={<Add />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Navbar />
            </div>
          </BrowserRouter>
        </SentencesProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
