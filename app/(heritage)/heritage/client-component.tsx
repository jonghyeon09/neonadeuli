'use client';
import FilterButton from '@/components/heritage/FilterButton';
import FilterSection from '@/components/heritage/FilterSection';
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

export default function ClientComponent({
  initList,
}: {
  initList: Heritage[];
}) {
  const [list, setList] = useState<Heritage[]>();
  const { value, onChange, reset } = useInput('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(value);
  };

  useEffect(() => {
    setList(initList);
  }, [initList]);

  return (
    <div>
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
      <FilterSection>
        <FilterButton filterCount={0} />
        <p className="boyd-3">
          총 <span className="font-semibold">0</span> 개
        </p>
      </FilterSection>
      <ListSection>
        {list?.map((el) => (
          <HeritageItem
            key={el.id}
            address={el.location}
            distance={el.distance}
            type={el.heritage_type}
            src={el.image_url}
          />
        ))}
      </ListSection>
    </div>
  );
}
