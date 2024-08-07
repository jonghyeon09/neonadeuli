'use client';
import DownArrowIcon from '@/components/icons/DownArrowIcon';
import { useEffect, useState } from 'react';
import { getDetail } from '@/app/api/openApi';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import api from '@/app/api';
import { HeritageDetail } from '@/types/api';
import TypeIcon from '@/components/icons/TypeIcon';
import CategoryIcon from '@/components/icons/CategoryIcon';
import EraIcon from '@/components/icons/EraIcon';
import AddressIcon from '@/components/icons/AddressIcon';

export default function Page() {
  const params = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [heritage, setHeritage] = useState<HeritageDetail>();

  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const detail = async () => {
      const { data, status } = await api.heritageDetail(params.id);

      if (status == 200) {
        setHeritage(data);
      }
    };

    detail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {heritage ? (
        <div className="flex flex-col justify-center gap-2 bg-[#ddd]/20">
          <div className="w-full h-[300px] relative flex justify-center items-center">
            <Image
              alt="사진"
              src={heritage.image_url}
              fill
              sizes="300px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="flex justify-center items-center flex-col gap-1 p-5 bg-white">
            <p className="headline">{heritage.name}</p>
            <p className="body-3 text-neutrals-800">{heritage.name_hanja}</p>
          </div>
          <div
            className={`relative p-5 bg-white flex flex-col gap-4 ${
              isOpen ? '' : 'max-h-[157px]'
            }`}
          >
            <p
              className={`body-3 text-neutrals-1200 whitespace-pre-wrap ${
                isOpen ? '' : 'line-clamp-3'
              }`}
            >
              {heritage.description}
            </p>
            <div className="h-[1px] bg-neutrals-100"></div>
            <button
              className="flex justify-center items-center gap-2 h-6"
              onClick={handleOpenClick}
            >
              <div className={`${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <DownArrowIcon></DownArrowIcon>
              </div>
              <p className="body-4 text-neutrals-1100">
                {isOpen ? '전체 내용 접기' : '전체 내용 보기'}
              </p>
            </button>
          </div>
          <div className="p-5 bg-white flex flex-col gap-[10px]">
            <div className="flex gap-1 body-3">
              <div className="flex gap-[2px]">
                <TypeIcon />
                <p className="font-semibold">유형 :</p>
              </div>
              <p>{heritage.heritage_type}</p>
            </div>
            <div className="flex gap-1 body-3">
              <div className="flex gap-[2px]">
                <CategoryIcon />
                <p className="font-semibold">분류 :</p>
              </div>
              <p>{`${heritage.category} > ${heritage.sub_category1} > ${heritage.sub_category2}`}</p>
            </div>
            <div className="flex gap-1 body-3">
              <div className="flex gap-[2px]">
                <EraIcon />
                <p className="font-semibold">시대 :</p>
              </div>
              <p>{heritage.era}</p>
            </div>
            <div className="flex gap-1 body-3">
              <div className="flex gap-[2px]">
                <AddressIcon />
                <p className="font-semibold">주소 :</p>
              </div>
              <p>{heritage.location}</p>
            </div>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  );
}
