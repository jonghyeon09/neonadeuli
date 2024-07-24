'use client';

import Main from '@/components/common/Main';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import { INITIAL_CENTER, useMapStore, useModalStore } from '@/store';
import { useEffect, useState } from 'react';
import { Coordinates } from '@/types/map';
import Header from '@/components/common/Header';
import Sidebar from '@/components/sidebar';

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const { map, initializeMap } = useMapStore();
  const { toggleModal } = useModalStore();

  useEffect(() => {
    setCoordinates(INITIAL_CENTER);
  }, []);

  return (
    <>
      <Main>
        <Header onMenu={() => toggleModal('isSidebar')} />
        <Map onLoad={initializeMap} />
        <Marker map={map} coordinates={coordinates} />
        <Sidebar onClose={() => toggleModal('isSidebar')}></Sidebar>
      </Main>
    </>
  );
}
