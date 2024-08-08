export default function CurationSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-3 p-5">
      <p className="heading text-neutrals-1400 mb-3">국가유산 나들이 추천</p>
      {children}
    </div>
  );
}
