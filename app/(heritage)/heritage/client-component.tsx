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
import {
  AreaCode,
  Heritage,
  HeritageList,
  heritageListParams,
} from '@/types/api';
import Filter from '@/components/heritage/Filter';
import MoreButton from '@/components/heritage/MoreButton';
import Link from 'next/link';

export default function ClientComponent({
  initList,
}: {
  initList: HeritageList | undefined;
}) {
  const [list, setList] = useState<Heritage[]>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [areaCode, setAreaCode] = useState<AreaCode | null>(null);
  const [total, setTotal] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [isLodaing, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const { value, onChange, reset } = useInput('');

  const getList = async (page: number) => {
    setIsLoading(true);
    setPage(page);

    const params: heritageListParams = {
      user_latitude: INITIAL_CENTER[0],
      user_longitude: INITIAL_CENTER[1],
      page: page,
      limit: limit,
      name: value,
    };

    if (areaCode) {
      params.area_code = areaCode;
    }

    const { data, status } = await api.heritageList(params);
    setIsLoading(false);

    if (status == 200) {
      if (data.items.length == limit) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }
      setTotal(data.total_count);

      return data.items;
    }
  };

  const handleResionCode = (code: number) => {
    setAreaCode(code);
  };

  const handleResetResion = () => {
    setAreaCode(null);
  };

  const handleSearch = async () => {
    setIsFilter(false);

    const list = await getList(1);
    setList(list);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const list = await getList(1);
    setList(list);
  };

  const handleMore = async () => {
    if (!list) return;

    const next = (await getList(limit + page)) || [];
    setList([...list, ...next]);
  };

  useEffect(() => {
    setList(initList?.items);
    if (initList?.items.length == 10) {
      setIsMore(true);
      setPage(11);
      setTotal(initList.total_count);
    }
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
              placeholder="검색어를 입력하세요."
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
        <FilterButton
          filterCount={areaCode ? 1 : 0}
          onClick={() => setIsFilter(true)}
        />
        <p className="boyd-3">
          총 <span className="font-semibold">{total}</span> 개
        </p>
      </CountSection>
      <ListSection>
        {list?.map((el) => (
          <Link key={el.id} href={`/heritage/${el.id}`}>
            <HeritageItem
              name={el.name}
              address={el.location}
              distance={el.distance}
              type={el.heritage_type}
              src={el.image_url}
            />
          </Link>
        ))}
        {isLodaing && <p>Loading...</p>}
      </ListSection>
      {isMore && <MoreButton onClick={handleMore} />}
    </>
  );
}
