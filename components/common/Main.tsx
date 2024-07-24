type Props = {
  children?: React.ReactNode;
};

export default function Main({ children }: Props) {
  return (
    <div className="relative w-full h-screen">
      <main className="bg-slate-100 max-w-screen-sm min-h-screen mx-auto">
        {children}
      </main>
    </div>
  );
}
