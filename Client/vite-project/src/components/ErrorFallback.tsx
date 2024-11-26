import React from 'react';
import Button from './Button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg text-white max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <div className="bg-red-900/20 border border-red-500/50 rounded p-4 mb-4">
          <p className="text-red-400 font-mono text-sm">{error.message}</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback; 