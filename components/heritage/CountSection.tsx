export default function CountSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center p-5">{children}</div>
  );
}
