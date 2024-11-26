import { useState, useCallback } from 'react';

interface UseApiStateOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useApiState(options: UseApiStateOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleApi = useCallback(async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      options.onSuccess?.();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [options]);

  return { loading, error, handleApi };
} 