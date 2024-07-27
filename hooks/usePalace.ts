import { getImage, getPalace } from '@/app/api/openApi';
import { useEffect, useState } from 'react';

export const usePalace = () => {
  const [palace, setPalace] = useState<HeritageItem[]>([]);

  const 경복궁 =
    'http://www.cha.go.kr/unisearch/images/history_site/1624483.jpg';
  const 창덕궁 =
    'http://www.cha.go.kr/unisearch/images/history_site/1624550.jpg';
  const 덕수궁 =
    'http://www.cha.go.kr/unisearch/images/history_site/1624564.jpg';
  const 창경궁 =
    'http://www.cha.go.kr/unisearch/images/history_site/1624562.jpg';
  const 경희궁지 =
    'http://www.cha.go.kr/unisearch/images/history_site/1624842.jpg';

  useEffect(() => {
    const fetchData = async () => {
      const res1 = async () => {
        const palace = await getPalace({
          params: {
            ccbaKdcd: '13',
            ccbaMnm1: '경복궁',
          },
        });
        let item = palace.item[0];

        item.imageUrl = 경복궁;

        return item;
      };
      const res2 = async () => {
        const palace = await getPalace({
          params: {
            ccbaKdcd: '13',
            ccbaMnm1: '창덕궁',
          },
        });
        let item = palace.item[0];

        item.imageUrl = 창덕궁;

        return item;
      };
      const res3 = async () => {
        const palace = await getPalace({
          params: {
            ccbaKdcd: '13',
            ccbaMnm1: '덕수궁',
          },
        });
        let item = palace.item[0];

        item.imageUrl = 덕수궁;

        return item;
      };
      const res4 = async () => {
        const palace = await getPalace({
          params: {
            ccbaKdcd: '13',
            ccbaMnm1: '창경궁',
          },
        });
        let item = palace.item[0];

        item.imageUrl = 창경궁;

        return item;
      };
      const res5 = async () => {
        const palace = await getPalace({
          params: {
            ccbaKdcd: '13',
            ccbaMnm1: '경희궁지',
          },
        });
        let item = palace.item[0];

        item.imageUrl = 경희궁지;

        return item;
      };
      const res = await Promise.all([res1(), res2(), res3(), res4(), res5()]);

      setPalace(res);
    };

    fetchData();
  }, []);

  return { palace };
};
