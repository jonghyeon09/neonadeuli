import { useEffect, useState } from 'react';
import type { Marker, NaverMap } from '@/types/map';

export default function Marker({ coordinates, map, icon }: Marker) {
  // const [marker, setMarker] = useState<naver.maps.Marker | null>(null);

  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map && coordinates) {
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(...coordinates),
        icon,
      });
    }

    return () => {
      marker?.setMap(null);
    };
  }, [coordinates, icon, map]);

  return null;
}
