type Props = {
  children?: React.ReactNode;
};

export default function Main({ children }: Props) {
  return (
    <div className="w-full min-h-screen bg-gray-300 overflow-y-auto">
      <main className="relative max-w-screen-sm min-h-screen mx-auto bg-white">
        {children}
      </main>
    </div>
  );
}
