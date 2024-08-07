export default function MoreButton({ onClick }: { onClick?: () => void }) {
  return (
    <div className="p-5 flex">
      <button
        className="p-3 flex flex-1 justify-center rounded border-[1px] border-neutrals-200"
        onClick={onClick}
      >
        더보기
      </button>
    </div>
  );
}
