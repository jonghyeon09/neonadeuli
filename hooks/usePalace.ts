import { getPalace } from '@/api/openApi';
import { useEffect, useState } from 'react';

export const usePalace = () => {
  const [palace, setPalace] = useState<HeritageItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await getPalace({
        params: {
          ccbaKdcd: 13,
          ccbaMnm1: '경복궁',
        },
      });
      const res2 = await getPalace({
        params: {
          ccbaKdcd: 13,
          ccbaMnm1: '창덕궁',
        },
      });
      const res3 = await getPalace({
        params: {
          ccbaKdcd: 13,
          ccbaMnm1: '덕수궁',
        },
      });
      const res4 = await getPalace({
        params: {
          ccbaKdcd: 13,
          ccbaMnm1: '창경궁',
        },
      });
      const res5 = await getPalace({
        params: {
          ccbaKdcd: 13,
          ccbaMnm1: '경희궁',
        },
      });
      const res = await Promise.all([res1, res2, res3, res4, res5]);
      const list = res.map((el) => el.item[0]);

      setPalace(list);
    };

    fetchData();
  }, []);

  return { palace };
};
