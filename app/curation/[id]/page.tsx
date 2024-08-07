'use client';
import DetailHeader from '@/components/common/DetailHeader';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Curation() {
  const params = useParams<{ id: string }>();
  const [src, setSrc] = useState('');

  useEffect(() => {
    const id = Number(params.id) - 1;
    const images = [
      '/image/curation-1.png',
      '/image/curation-2.png',
      '/image/curation-3.png',
    ];

    setSrc(images[id]);
  }, [params.id]);

  return (
    <>
      <DetailHeader title="" />
      <div className="flex justify-center">
        {src.length !== 0 && (
          <Image alt="" src={src} width={375} height={3000} priority />
        )}
      </div>
    </>
  );
}
