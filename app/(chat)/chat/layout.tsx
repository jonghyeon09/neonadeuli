import DetailHeader from '@/components/common/DetailHeader';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <DetailHeader title="경복궁"></DetailHeader>
      <section className="min-h-screen pt-[var(--h-header)]">
        {children}
      </section>
    </>
  );
}
