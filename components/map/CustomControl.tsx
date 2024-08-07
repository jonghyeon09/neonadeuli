import { NaverMap } from '@/types/map';
import { useEffect, useRef } from 'react';
import OnLocationIcon from '../icons/OnLocationIcon';
import OffLocationIcon from '../icons/OffLocationIcon';
import ReactDOM, { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

export default function CustomControl({
  map,
  isActivate = false,
  onClick,
}: {
  map: NaverMap | null;
  isActivate: boolean;
  onClick: () => void;
}) {
  const btnHtml = document.createElement('div');
  btnHtml.id = 'LocationButton';
  btnHtml.className = 'm-1';

  // useEffect(() => {
  //   if (!map) return;
  //   const customControl = new naver.maps.CustomControl(btnHtml.outerHTML, {
  //     position: naver.maps.Position.BOTTOM_RIGHT,
  //   });

  //   naver.maps.Event.once(map, 'init', () => {
  //     customControl.setMap(map);

  //     naver.maps.Event.addDOMListener(
  //       customControl.getElement(),
  //       'click',
  //       () => {
  //         onClick();
  //       }
  //     );
  //   });

  //   return () => customControl.setMap(null);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [btnHtml.outerHTML, map]);

  return (
    <>
      {/* {btnHtml &&
        createPortal(
          <button>
            <div className="w-10 h-10 radius-m bg-white flex justify-center items-center shadow-md">
              {isActivate ? <OnLocationIcon /> : <OffLocationIcon />}
            </div>
          </button>,
          btnHtml
        )} */}
      <button onClick={onClick} className="absolute right-0 top-[260px] m-1">
        <div className="w-10 h-10 radius-m bg-white flex justify-center items-center shadow-md">
          {isActivate ? <OnLocationIcon /> : <OffLocationIcon />}
        </div>
      </button>
    </>
  );
}
