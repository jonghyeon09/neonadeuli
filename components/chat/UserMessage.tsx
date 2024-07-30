type Props = {
  text: string;
};

export default function UserMessage({ text }: Props) {
  return (
    <div className="flex justify-end">
      <p className="flex items-end justify-end mr-2 body-4 text-neutrals-700">
        00:00 AM
      </p>
      <div className="p-4 rounded-[10px] rounded-tr-none bg-primary-500 max-w-[208px]">
        <p className="body-3 break-words">{text}</p>
      </div>
      <svg
        width="9"
        height="10"
        viewBox="0 0 9 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0H7.58579C8.47669 0 8.92286 1.07714 8.29289 1.70711L0 10V0Z"
          fill="#FABC58"
        />
      </svg>
    </div>
  );
}
