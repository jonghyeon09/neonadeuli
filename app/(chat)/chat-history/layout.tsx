import DetailHeader from '@/components/common/DetailHeader';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <DetailHeader title="대화 목록"></DetailHeader>
      <section className="flex min-h-screen pt-[var(--h-header)]">
        {children}
      </section>
    </>
  );
}
