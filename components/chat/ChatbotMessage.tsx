import React from 'react';

export default function ChatbotMessage() {
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

      <div className="p-4 rounded-[10px] rounded-bl-none bg-white max-w-[208px]">
        <p className="body-3">광화문에 대해, 어떤 이야기를 듣고 싶은 것이오?</p>
      </div>
      <p className="flex items-end justify-end ml-2 body-4 text-neutrals-700">
        00:00 AM
      </p>
    </div>
  );
}