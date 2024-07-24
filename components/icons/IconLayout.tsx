type Props = {
  children: React.ReactNode;
};

export default function IconLayout({ children }: Props) {
  return (
    <div className="w-6 h-6 flex justify-center items-center">{children}</div>
  );
}
