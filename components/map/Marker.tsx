import { useEffect, useState } from 'react';
import type { Marker, NaverMap } from '@/types/map';

export default function Marker({ coordinates, map, icon, onClick }: Marker) {
  // const [marker, setMarker] = useState<naver.maps.Marker | null>(null);

  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map && coordinates) {
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(...coordinates),
        icon,
      });

      if (onClick) {
        naver.maps.Event.addListener(marker, 'click', onClick);
      }
    }

    return () => {
      marker?.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, icon, map]);

  return null;
}
