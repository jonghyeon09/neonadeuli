export default function QuizChoice({
  length = 0,
  onClick,
}: {
  length: number;
  onClick: (n: number) => void;
}) {
  return (
    <div className="mt-[100px] flex gap-[10px] p-4 w-full z-50 bg-quiz">
      {[...Array(Number(length))].map((n, i) => (
        <button
          className="w-[60px] h-[60px] bg-white radius-m shadow-md flex justify-center items-center"
          key={i}
          onClick={() => onClick(i + 1)}
        >
          <p className="body-3 text-neutrals-1300">{i + 1}번</p>
        </button>
      ))}
    </div>
  );
}
