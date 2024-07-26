'use client';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import { INITIAL_CENTER, useMapStore, useModalStore } from '@/store';
import { useEffect, useState } from 'react';
import { Coordinates } from '@/types/map';
import Header from '@/components/common/Header';
import Sidebar from '@/components/sidebar';
import Recommendation from '@/components/recommendation';
import { usePalace } from '@/hooks/usePalace';
import SlideItem from '@/components/common/SlideItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const { map, initializeMap } = useMapStore();
  const { toggleModal } = useModalStore();
  const { palace } = usePalace();
  const router = useRouter();

  const handlePalaceClick = (palace: HeritageItem) => {
    router.push(
      `/heritage/description?ccbaKdcd=${palace.ccbaKdcd[0]}&ccbaAsno=${palace.ccbaAsno[0]}&ccbaCtcd=${palace.ccbaCtcd[0]}`
    );
  };

  useEffect(() => {
    setCoordinates(INITIAL_CENTER);
  }, [palace]);

  return (
    <>
      <Header onMenu={() => toggleModal('isSidebar')} />
      <Map onLoad={initializeMap} />
      <Marker map={map} coordinates={coordinates} />
      <Sidebar onClose={() => toggleModal('isSidebar')}></Sidebar>
      <Recommendation
        title="서울의 아름다운 궁궐 5선"
        onClick={() => router.push('/palace')}
      >
        <Swiper
          slidesPerView={2}
          spaceBetween={0}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
          }}
          onSlideChange={() => console.log('slide change')}
        >
          {palace.map((el) => (
            <SwiperSlide key={el.ccbaAsno[0]}>
              <SlideItem
                key={el.ccbaAsno[0]}
                text={el.ccbaMnm1[0]}
                src={el.imageUrl}
                onClick={() => handlePalaceClick(el)}
              ></SlideItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </Recommendation>
    </>
  );
}
