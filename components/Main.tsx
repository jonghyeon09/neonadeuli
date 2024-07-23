type Props = {
  children?: React.ReactNode;
};

export default function Main({ children }: Props) {
  return (
    <main className="w-full h-screen">
      <div className="bg-slate-100 max-w-screen-sm min-h-screen mx-auto">
        {children}
      </div>
    </main>
  );
}
