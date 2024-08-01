export default function ChatTooltip() {
  return (
    <div className="absolute right-5 bottom-[56px] z-50">
      <div className="flex flex-col gap-2 p-[10px] rounded-t-[10px] rounded-bl-[10px] bg-secondary-100">
        <p className="body-3 text-neutrals-1300 font-semibold">
          채팅 이용 안내
        </p>
        <p className="body-4">
          &#39;여행 끝내기&#39; 버튼을 누르면
          <br /> 대화 내용을 요약해드려요.
        </p>
      </div>
      <div className="flex justify-end w-full">
        <svg
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.10557 8.21114C4.4741 8.94819 5.5259 8.94819 5.89443 8.21115L10 0H0L4.10557 8.21114Z"
            fill="#FAF7F1"
          />
        </svg>
      </div>
    </div>
  );
}
