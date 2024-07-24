type Props = {
  children?: React.ReactNode;
};

export default function Main({ children }: Props) {
  return (
    <div className=" w-full h-screen">
      <main className="relative bg-slate-100 max-w-screen-sm min-h-screen mx-auto">
        {children}
      </main>
    </div>
  );
}
