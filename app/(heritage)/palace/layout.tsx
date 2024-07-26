import DetailHeader from '@/components/common/DetailHeader';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <DetailHeader title="서울의 아름다운 궁궐 5선" />
      <section className="min-h-screen pt-[var(--h-header)]">
        {children}
      </section>
    </>
  );
}
