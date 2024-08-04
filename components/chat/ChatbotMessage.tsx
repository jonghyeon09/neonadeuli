import { timeFormat } from '@/utils/timestampFormat';
import Image from 'next/image';

type Props = {
  text: string;
  time: string;
  image?: string;
};

export default function ChatbotMessage({ text, time, image }: Props) {
  return (
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

      <div className="p-4 rounded-[10px] rounded-bl-none bg-white min-w-[208px] max-w-[55%] felx flex-col">
        {image && (
          <div className="relative w-full h-[132px] bg-neutrals-300 mb-[10px]">
            <Image alt="사진" src={image} fill />
          </div>
        )}

        <p className="body-3 break-words whitespace-pre-wrap text-neutrals-1300">
          {text}
        </p>
      </div>
      <p className="flex items-end justify-end ml-2 body-4 text-neutrals-700">
        {timeFormat(time)}
      </p>
    </div>
  );
}
