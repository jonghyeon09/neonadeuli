'use client';

import Main from '@/components/common/Main';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import { INITIAL_CENTER, useMapStore, useModalStore } from '@/store';
import { useEffect, useState } from 'react';
import { Coordinates } from '@/types/map';
import Header from '@/components/common/Header';
import Sidebar from '@/components/sidebar';
import Recommendation from '@/components/recommendation';
import Slide from '@/components/common/Slide';
import { usePalace } from '@/hooks/usePalace';

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const { map, initializeMap } = useMapStore();
  const { toggleModal } = useModalStore();
  const { palace } = usePalace();

  useEffect(() => {
    setCoordinates(INITIAL_CENTER);
    console.log(palace);
  }, [palace]);

  return (
    <>
      <Main>
        <Header onMenu={() => toggleModal('isSidebar')} />
        <Map onLoad={initializeMap} />
        <Marker map={map} coordinates={coordinates} />
        <Sidebar onClose={() => toggleModal('isSidebar')}></Sidebar>
        <Recommendation title="서울의 아름다운 궁궐 5선">
          <Slide></Slide>
        </Recommendation>
      </Main>
    </>
  );
}
