type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return <section className="min-h-screen">{children}</section>;
}
