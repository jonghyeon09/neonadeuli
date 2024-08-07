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
