'use client';

import Main from '@/components/common/Main';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import Image from 'next/image';
import { INITIAL_CENTER, useMapStore } from '@/store';
import { useEffect, useState } from 'react';
import { Coordinates } from '@/types/map';
import Header from '@/components/common/Header';
import Modal from '@/components/modal/Modal';

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const map = useMapStore((state) => state.map);
  const initializeMap = useMapStore((state) => state.initializeMap);

  useEffect(() => {
    setCoordinates(INITIAL_CENTER);
  }, []);

  return (
    <>
      <Main>
        <Header />
        <Map onLoad={initializeMap} />
        <Marker map={map} coordinates={coordinates} />
      </Main>
    </>
  );
}
