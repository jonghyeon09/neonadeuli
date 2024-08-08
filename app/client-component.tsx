'use client';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import {
  INITIAL_CENTER,
  INITIAL_ZOOM,
  useMapStore,
  useModalStore,
} from '@/store';
import { useEffect, useState } from 'react';
import { Coordinates, ImageIcon } from '@/types/map';
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
import Splash from '@/components/common/Splash';
import useGeolocation from '@/hooks/useGeolocation';
import CustomControl from '@/components/map/CustomControl';
import CurationSection from '@/components/curation/CurationSection';
import CurationItem from '@/components/curation/CurationItem';

type Props = {
  palace: HeritageItem[];
};

export default function Home({ palace }: Props) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [markerIcon, setMarkerIcon] = useState<ImageIcon>();
  const [isActivate, setIsActivate] = useState(false);
  const { map, initializeMap } = useMapStore();
  const { toggleModal, setOpen } = useModalStore();
  const { user, login, setLogin, reset, setUser } = useUserStore();
  const { location, startTracking, stopTracking } = useGeolocation();
  const router = useRouter();

  const handlePalaceClick = (palace: HeritageItem) => {
    router.push(
      `/heritage/description?ccbaKdcd=${palace.ccbaKdcd[0]}&ccbaAsno=${palace.ccbaAsno[0]}&ccbaCtcd=${palace.ccbaCtcd[0]}`
    );
  };

  const handleActivateLocation = () => {
    setIsActivate(!isActivate);
  };

  const handleMarkerClick = () => {
    setOpen('isArrive');
  };

  useEffect(() => {
    const getUser = async () => {
      const { data, status } = await api.login();

      if (status != 200) {
        localStorage.removeItem('user_id');
        reset();
      } else {
        localStorage.setItem('user_id', String(data.id));
        setUser(data);
      }
    };
    // const userId = cookies.get('user_id');
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      getUser();
      setLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCoordinates(INITIAL_CENTER);
  }, []);

  useEffect(() => {
    if (!map) return;
    const markerIcon: ImageIcon = {
      url: '/marker.svg',
    };

    setMarkerIcon(markerIcon);
  }, [map]);

  useEffect(() => {
    if (isActivate) {
      startTracking();
    } else {
      stopTracking();
      map?.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivate]);

  useEffect(() => {
    if (!map || !location) return;

    map.morph(new naver.maps.LatLng(location.lat, location.lon), INITIAL_ZOOM);
  }, [location, map]);

  return (
    <>
      {login ? (
        <>
          <Header
            onMenu={() => toggleModal('isSidebar')}
            onHeritage={() => router.push('/heritage')}
          />
          <Map onLoad={initializeMap} />
          <Marker
            map={map}
            coordinates={coordinates}
            icon={markerIcon}
            onClick={handleMarkerClick}
          />
          <CustomControl
            map={map}
            isActivate={isActivate}
            onClick={handleActivateLocation}
          />
          <Sidebar onClose={() => toggleModal('isSidebar')}></Sidebar>
          <div className="flex items-center justify-center h-16 p-2 bg-neutrals-100">
            <Link href={'/chat-history'} scroll={false} className="h-full">
              <ChatButton />
            </Link>
          </div>
          <CurationSection>
            <Swiper slidesPerView={'auto'} spaceBetween={12}>
              <SwiperSlide>
                <Link href={'/curation/1'}>
                  <CurationItem
                    src="/image/썸네일-1.png"
                    date="2024.08"
                    count={5}
                    title="오늘 , 궁을 거닐다"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href={'/curation/2'}>
                  <CurationItem
                    src="/image/썸네일-2.png"
                    date="2024.08"
                    count={5}
                    title="자연에 안긴 고요한 사찰"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link href={'/curation/3'}>
                  <CurationItem
                    src="/image/썸네일-3.png"
                    date="2024.08"
                    count={5}
                    title="국가유산의 길을 따라 새롭게 만나다"
                  />
                </Link>
              </SwiperSlide>
            </Swiper>
          </CurationSection>
          {/* <Recommendation>
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
          </Recommendation> */}
        </>
      ) : (
        <Splash />
      )}
    </>
  );
}
