type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return <section className="min-h-screen flex flex-col">{children}</section>;
}
