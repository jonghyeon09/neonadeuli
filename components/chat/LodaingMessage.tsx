import { useEffect, useState } from 'react';
import Eyes from '../icons/Eyes';

type Props = {
  isLoading: boolean;
};

export default function LodaingMessage({ isLoading = false }: Props) {
  // const [loadingText, setLoadingText] = useState('');
  const [eye, setEye] = useState<JSX.Element>();

  useEffect(() => {
    let index = 0;

    const id = setInterval(() => {
      index += 1;

      if (index > Eyes.length - 1) {
        index = 0;
      }
      setEye(Eyes[index]);
    }, 300);

    return () => clearInterval(id);
  }, []);

  // useEffect(() => {
  //   let text = '.';
  //   const id = setInterval(() => {
  //     text += '.';
  //     setLoadingText(text);
  //   }, 500);

  //   if (!isLoading) {
  //     text = '.';
  //     clearInterval(id);
  //   }

  //   return () => clearInterval(id);
  // }, [isLoading]);

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

          <div className="p-4 rounded-[10px] rounded-bl-none bg-white min-w-[208px] flex flex-col gap-4 items-center">
            <p className="body-3 break-words">{eye}</p>
            <p className="body-3 break-words">
              내 답변을 신중히 생각 중이오.
              <br />
              잠시만 기다려 주시오.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
