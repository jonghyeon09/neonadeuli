import { useEffect, useState } from 'react';

type Props = {
  isLoading: boolean;
};

export default function LodaingMessage({ isLoading = false }: Props) {
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    let text = '.';
    const id = setInterval(() => {
      text += '.';
      setLoadingText(text);
    }, 500);

    if (!isLoading) {
      text = '.';
      clearInterval(id);
    }

    return () => clearInterval(id);
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="flex items-end">
          <svg
            width="9"
            height="10"
            viewBox="0 0 9 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41421 10C0.523309 10 0.077142 8.92286 0.707107 8.29289L9 0V10H1.41421Z"
              fill="white"
            />
          </svg>

          <div className="p-4 rounded-[10px] rounded-bl-none bg-white min-w-[208px] max-w-[55%]">
            <p className="body-3 break-words">{loadingText}</p>
          </div>
        </div>
      )}
    </>
  );
}
