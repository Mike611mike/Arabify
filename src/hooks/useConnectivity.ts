
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useConnectivity = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOffline(!online);
      
      if (online) {
        toast.success('You are back online');
      } else {
        toast.warning('You are offline. Data will be saved locally.');
      }
    };

    // Initialize offline state
    setIsOffline(!navigator.onLine);
    
    // Add event listeners
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return { isOffline };
};
