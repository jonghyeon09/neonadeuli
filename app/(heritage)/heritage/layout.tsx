'use client';
import DetailHeader from '@/components/common/DetailHeader';
import { useParams } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};
export default function HeritageLayout({ children }: Props) {
  const params = useParams<{ id: string }>();

  return (
    <>
      <DetailHeader
        title={'id' in params ? '' : '국가유산 검색'}
      ></DetailHeader>
      <section className="min-h-screen pt-[var(--h-header)] flex flex-col">
        {children}
      </section>
    </>
  );
}
