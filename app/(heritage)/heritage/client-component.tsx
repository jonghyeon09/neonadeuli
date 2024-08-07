'use client';
import FilterButton from '@/components/heritage/FilterButton';
import CountSection from '@/components/heritage/CountSection';
import HeritageItem from '@/components/heritage/HeritageItem';
import ListSection from '@/components/heritage/ListSection';
import SearchSection from '@/components/heritage/SearchSection';
import InputResetIcon from '@/components/icons/InputResetIcon';
import SearchInputIcon from '@/components/icons/SearchInputIcon';
import useInput from '@/hooks/useInput';
import { useEffect, useState } from 'react';
import api from '@/app/api';
import { INITIAL_CENTER } from '@/store';
import { AreaCode, Heritage } from '@/types/api';
import Filter from '@/components/heritage/Filter';

export default function ClientComponent({
  initList,
}: {
  initList: Heritage[];
}) {
  const [list, setList] = useState<Heritage[]>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [areaCode, setAreaCode] = useState(AreaCode.서울);
  const [isFilter, setIsFilter] = useState(false);
  const [isLodaing, setIsLoading] = useState(false);
  const { value, onChange, reset } = useInput('');

  const getList = async () => {
    setIsLoading(true);
    const { data, status } = await api.heritageList({
      user_latitude: INITIAL_CENTER[0],
      user_longitude: INITIAL_CENTER[1],
      page: page,
      limit: limit,
      area_code: areaCode,
      name: value,
    });

    if (status == 200) {
      setList(data);
    }
    setIsLoading(false);
  };

  const handleResionCode = (code: number) => {
    setAreaCode(code);
  };

  const handleResetResion = () => {
    setAreaCode(AreaCode.서울);
  };

  const handleSearch = () => {
    getList();
    setIsFilter(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getList();
  };

  useEffect(() => {
    setList(initList);
  }, [initList]);

  return (
    <>
      {isFilter && (
        <Filter
          code={areaCode}
          onClick={handleResionCode}
          onReset={handleResetResion}
          onSearch={handleSearch}
          onClose={() => setIsFilter(false)}
        />
      )}
      <SearchSection>
        <form
          className="flex items-center justify-between p-3 bg-neutrals-100 rounded-lg h-11 relative"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-1 gap-2">
            <SearchInputIcon />
            <input
              className="focus:outline-none flex-1 bg-transparent h-5 placeholder:text-[13px] body-3"
              type="text"
              placeholder="국가 유산 키워드를 입력하세요."
              value={value}
              onChange={onChange}
            />
          </div>
          <div className="cursor-pointer" onClick={reset}>
            <InputResetIcon />
          </div>
        </form>
      </SearchSection>
      <CountSection>
        <FilterButton filterCount={1} onClick={() => setIsFilter(true)} />
        <p className="boyd-3">
          총 <span className="font-semibold">0</span> 개
        </p>
      </CountSection>
      <ListSection>
        {isLodaing && 'Loading...'}
        {list?.map((el) => (
          <HeritageItem
            key={el.id}
            name={el.name}
            address={el.location}
            distance={el.distance}
            type={el.heritage_type}
            src={el.image_url}
          />
        ))}
      </ListSection>
    </>
  );
}
