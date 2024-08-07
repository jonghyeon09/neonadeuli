export default function FilterButton({
  filterCount = 0,
  onClick,
}: {
  filterCount: number;
  onClick?: () => void;
}) {
  return (
    <button
      className="h-9 rounded-[18px] border-[1px] border-neutrals-100 flex justify-center items-center px-2"
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 9H19" stroke="#2D2D2D" strokeLinecap="round" />
        <circle cx="15" cy="9" r="2" fill="white" stroke="#2D2D2D" />
        <path d="M5 15H19" stroke="#2D2D2D" strokeLinecap="round" />
        <circle cx="9" cy="15" r="2" fill="white" stroke="#2D2D2D" />
      </svg>
      <p className="body-4">필터 {filterCount}개</p>
    </button>
  );
}
