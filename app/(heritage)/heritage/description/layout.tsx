import DetailHeader from '@/components/common/DetailHeader';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <DetailHeader title="" />
      <section className="min-h-screen pt-[var(--h-header)]">
        {children}
      </section>
    </>
  );
}
