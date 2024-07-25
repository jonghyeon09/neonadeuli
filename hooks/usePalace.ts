import { getPalace } from '@/api/openApi';
import { useEffect, useState } from 'react';

export const usePalace = () => {
  const [palace, setPalace] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPalace({
        params: {
          ccbaKdcd: 13,
          ccbaMnm1: '경복궁',
        },
      });
      console.log(res);

      setPalace(res);
    };

    fetchData();
  }, []);

  return { palace };
};
