'use client';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import { INITIAL_CENTER, useMapStore, useModalStore } from '@/store';
import { useEffect, useState } from 'react';
import { Coordinates } from '@/types/map';
import Header from '@/components/common/Header';
import Sidebar from '@/components/sidebar';
import Recommendation from '@/components/recommendation';
import SlideItem from '@/components/common/SlideItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/navigation';
import ChatButton from '@/components/chat/ChatButton';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import api from './api';
import cookies from 'js-cookie';
import Splash from '@/components/common/Splash';

type Props = {
  palace: HeritageItem[];
};

export default function Home({ palace }: Props) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const { map, initializeMap } = useMapStore();
  const { toggleModal } = useModalStore();
  const router = useRouter();
  const { user, login, setLogin, reset, setUser } = useUserStore();

  const handlePalaceClick = (palace: HeritageItem) => {
    router.push(
      `/heritage/description?ccbaKdcd=${palace.ccbaKdcd[0]}&ccbaAsno=${palace.ccbaAsno[0]}&ccbaCtcd=${palace.ccbaCtcd[0]}`
    );
  };

  useEffect(() => {
    const getUser = async () => {
      const { data, status } = await api.login();

      cookies.set('user_id', String(data.id), { secure: true, expires: 30 });
      setUser(data);
    };
    const userId = cookies.get('user_id');

    if (!userId) {
      setLogin();
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCoordinates(INITIAL_CENTER);
  }, []);

  return (
    <>
      {login ? (
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
          <div className="absolute right-5 bottom-[164px] z-50">
            <Link href={'/chat-history'} scroll={false}>
              <ChatButton />
            </Link>
          </div>
        </>
      ) : (
        <Splash />
      )}
    </>
  );
}
