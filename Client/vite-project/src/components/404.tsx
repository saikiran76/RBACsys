import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../context/ThemeContext';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/404.json';

const NotFound = ({className}: {className?: string}) => {
  const [showMessage, setShowMessage] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const lottieStyle = {
    width: 200,
    height: 300
  };

  return (
    <div className={twMerge("h-screen w-full bg-zinc-900", isDarkMode ? 'text-white' : 'text-gray-900 bg-white/70', className)}>
      <div className="tooltip flex items-center justify-center">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
          style={lottieStyle}
          onClick={() => null}
        />
      </div>

      {showMessage && (
        <div className="text-center mt-8 max-w-md px-4 animate-fade-in">
          <p className="mb-4 ">
            Page Not Found. Login <span className='text-lime-700'><a href='https://rbac-sys.vercel.app/'>here</a></span>
          </p>
        </div>
      )}
    </div>
  );
};

export default NotFound; 