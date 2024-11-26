import { useEffect } from 'react';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg
      ${type === 'success' ? 'bg-lime-500 text-white' : 'bg-red-500 text-white'}`}>
      {type === 'success' ? <FiCheck /> : <FiAlertCircle />}
      <p>{message}</p>
      <button onClick={onClose} className="ml-2">
        <FiX />
      </button>
    </div>
  );
};

export default Toast; 