import { getPalace } from '@/api/openApi';
import { useEffect, useState } from 'react';

export const usePalace = () => {
  const [palace, setPalace] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await getPalace({
        params: {
          ccbaKdcd: 13,
          ccbaMnm1: '경복궁',
        },
      });
      console.log(res1);
    };

    fetchData();
  }, []);

  return { palace };
};
