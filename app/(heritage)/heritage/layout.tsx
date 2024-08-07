import DetailHeader from '@/components/common/DetailHeader';

type Props = {
  children: React.ReactNode;
  splash: React.ReactNode;
};
export default function Layout({ children, splash }: Props) {
  return (
    <>
      {splash}
      <DetailHeader title="국가유산 리스트"></DetailHeader>
      <section className="min-h-screen pt-[var(--h-header)] flex flex-col">
        {children}
      </section>
    </>
  );
}
