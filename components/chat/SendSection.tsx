export default function SendSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-2 px-3 fixed bottom-0 bg-white w-full max-w-screen-sm flex items-center gap-2">
      {children}
    </div>
  );
}
