type Props = {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function RecommendationTheme({
  title,
  children,
  onClick,
}: Props) {
  return (
    <>
      <div className="relative w-full h-[192px] px-5 mt-8">
        <div className="flex justify-between mb-4">
          <span className="text-xl font-medium">{title}</span>
          <button className="text-sm text-[#707070]" onClick={onClick}>
            전체보기 &gt;
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
