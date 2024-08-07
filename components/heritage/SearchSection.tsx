export default function SearchSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="p-5 flex flex-col gap-2">
      <p className="headline text-neutrals-1300">국가 유산 탐색</p>
      {children}
    </div>
  );
}
