'use client';
import DownArrowIcon from '@/components/icons/DownArrowIcon';
import { useEffect, useMemo, useState } from 'react';
import { getDetail } from '@/app/api/openApi';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function Description() {
  const [isOpen, setIsOpen] = useState(false);
  const [heritage, setHeritage] = useState<HeritageDetailItem>();

  const searchParams = useSearchParams();

  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

  const query = useMemo(() => {
    const ccbaKdcd = searchParams.get('ccbaKdcd');
    const ccbaAsno = searchParams.get('ccbaAsno');
    const ccbaCtcd = searchParams.get('ccbaCtcd');
    const condition = ccbaKdcd == null || ccbaAsno == null || ccbaCtcd == null;

    if (condition) return;

    const query = {
      ccbaKdcd,
      ccbaAsno,
      ccbaCtcd,
    };

    return query;
  }, [searchParams]);

  const getData = async () => {
    if (!query) return;

    const res: HeritageDetail = await getDetail({
      params: {
        ccbaCtcd: query.ccbaCtcd,
        ccbaAsno: query.ccbaAsno,
        ccbaKdcd: query.ccbaKdcd,
      },
    });

    setHeritage(res.item[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {heritage ? (
        <div className="flex flex-col justify-center gap-1 bg-[#ddd]/20">
          <div className="w-full h-[300px] relative flex justify-center items-center">
            <Image
              alt="사진"
              src={heritage.imageUrl[0]}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="flex justify-center items-center flex-col gap-1 p-5 bg-white">
            <p className="font-bold">{heritage.ccbaMnm1[0]}</p>
            <p className="text-sm text-[#8d939d]">{heritage.ccbaMnm2[0]}</p>
          </div>
          <div className={`relative p-5 bg-white ${isOpen ? '' : 'h-[144px]'}`}>
            <p
              className={`text-[13px] text-[#6c6c6c] mb-5 ${
                isOpen ? '' : 'line-clamp-3'
              } `}
            >
              {heritage.content[0]}
            </p>
            <button
              className={`relative left-1/2 bottom-5 -translate-x-1/2 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
              onClick={handleOpenClick}
            >
              <DownArrowIcon></DownArrowIcon>
            </button>
          </div>
          <div className="p-5 bg-white">
            <p className="text-[13px] font-medium">
              종목: <span className="text-[13px]">{heritage.ccmaName[0]}</span>
            </p>
            <p className="text-[13px] font-medium">
              분류: <span className="text-[13px]">{heritage.gcodeName[0]}</span>
            </p>
            <p className="text-[13px] font-medium">
              시대: <span className="text-[13px]">{heritage.ccceName[0]}</span>
            </p>
            <p className="text-[13px] font-medium">
              주소: <span className="text-[13px]">{heritage.ccbaLcad[0]}</span>
            </p>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  );
}
