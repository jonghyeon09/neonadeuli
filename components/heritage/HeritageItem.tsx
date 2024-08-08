import Image from 'next/image';

export default function HeritageItem({
  src = '',
  name,
  address = '',
  type = '',
  distance = 0,
}: {
  src?: string;
  name: string;
  type: string;
  address: string;
  distance: number;
}) {
  return (
    <div className="flex gap-3 p-5 border-b-2 border-b-neutrals-100">
      <div className="relative bg-neutrals-300 w-[96px] h-[96px] rounded-[16px] overflow-hidden">
        <Image alt="" src={src} fill sizes="96px" />
      </div>
      <div className="flex flex-col gap-2 truncate">
        <p className="body-2 font-semibold">{name}</p>
        <div className="flex flex-col">
          <div className="h-5 flex gap-2 items-center body-3 text-neutrals-1000">
            <svg
              width="9"
              height="12"
              viewBox="0 0 9 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.50007 0C2.01455 0 0 1.5002 0 4.50007C0 7.50046 3.75023 12 4.50007 12C5.2499 12 9.00013 7.49993 9.00013 4.50007C9.00013 1.5002 6.98558 0 4.50007 0ZM6.75007 4.50003C6.75007 5.74269 5.74269 6.75007 4.50003 6.75007C3.25738 6.75007 2.25 5.74269 2.25 4.50003C2.25 3.25737 3.25738 2.25 4.50003 2.25C5.74269 2.25 6.75007 3.25737 6.75007 4.50003Z"
                fill="#5A5A5A"
              />
            </svg>
            <p>주소 : {address}</p>
          </div>
          <div className="h-5 flex gap-2 items-center body-3 text-neutrals-1000">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.03088 2.11132C2.35605 1.72335 2.5693 1.3103 2.71793 1.02243C2.75767 0.945468 2.79278 0.877451 2.82419 0.821254C2.90888 0.669678 2.95968 0.608829 2.99165 0.582129C2.99226 0.581614 2.99288 0.581094 2.99349 0.580571C3.0037 0.571882 3.01472 0.562508 3.06651 0.562509H8.93346C8.98525 0.56251 8.99628 0.571887 9.00649 0.580581C9.00711 0.581103 9.00772 0.581623 9.00834 0.582138C9.04031 0.608841 9.09111 0.669691 9.1758 0.821266C9.2072 0.877463 9.24232 0.94548 9.28206 1.02245C9.43068 1.31031 9.64394 1.72336 9.96911 2.11133C10.4116 2.63933 10.7887 2.81516 11.1366 2.89856C11.3796 2.95685 11.4081 2.95529 11.4223 2.96878C11.426 2.97236 11.4287 2.97699 11.4342 2.98409C11.4394 3.00233 11.4488 3.07704 11.3723 3.263C11.2709 3.50933 11.0756 3.79416 10.8655 4.04488C10.4912 4.49138 10.1014 4.6875 9.66685 4.6875H2.33311C1.89862 4.68753 1.5088 4.49141 1.13454 4.04488C0.92441 3.79416 0.729102 3.50933 0.627733 3.263C0.551217 3.07706 0.560614 3.00233 0.565793 2.98407C0.571254 2.97698 0.57399 2.97235 0.577737 2.96877C0.591866 2.95528 0.620358 2.95684 0.863422 2.89855C1.21123 2.81515 1.58834 2.63932 2.03088 2.11132ZM11.4323 2.9794C11.4324 2.97934 11.433 2.98034 11.4338 2.9826C11.4326 2.98059 11.4322 2.97947 11.4323 2.9794ZM0.567658 2.97939C0.567762 2.97945 0.567395 2.98058 0.566242 2.9826C0.566976 2.98033 0.567553 2.97932 0.567658 2.97939Z"
                stroke="#5A5A5A"
                strokeWidth="1.125"
              />
              <path d="M2.25 4.5H3.75V6H2.25V4.5Z" fill="#5A5A5A" />
              <path d="M8.25 4.5H9.75V6H8.25V4.5Z" fill="#5A5A5A" />
              <path
                d="M5.40887 10.2L4.84637 10.2V11.4C4.84637 11.4132 4.84168 11.4227 4.83503 11.4295C4.83165 11.4329 4.82838 11.4349 4.82593 11.436C4.82388 11.4368 4.82152 11.4375 4.81774 11.4375H1.3412C1.33679 11.4375 1.33437 11.4367 1.33241 11.4358C1.32988 11.4346 1.32629 11.4323 1.32262 11.4281C1.31541 11.4199 1.31127 11.4092 1.31285 11.3949L1.84487 6.59489C1.84766 6.56971 1.8656 6.5625 1.87322 6.5625H10.1268C10.1344 6.5625 10.1523 6.56971 10.1551 6.59489L10.6871 11.3949C10.6887 11.4092 10.6846 11.4199 10.6774 11.4281C10.6737 11.4323 10.6701 11.4346 10.6676 11.4358C10.6656 11.4367 10.6632 11.4375 10.6588 11.4375H7.18226C7.17848 11.4375 7.17612 11.4368 7.17407 11.436C7.17162 11.4349 7.16835 11.4329 7.16497 11.4295C7.15832 11.4227 7.15363 11.4132 7.15363 11.4V10.2H6.59113C7.15363 10.2 7.15363 10.1997 7.15363 10.1995L7.15363 10.1989L7.15363 10.1977L7.15361 10.1952L7.15354 10.1893L7.15318 10.1748C7.15282 10.1639 7.15219 10.1504 7.15109 10.1347C7.1489 10.1036 7.14478 10.0627 7.13696 10.0151C7.12177 9.92259 7.09033 9.79048 7.02184 9.65143C6.95235 9.51037 6.83887 9.35096 6.65699 9.22788C6.47117 9.10215 6.24795 9.0375 6 9.0375C5.75206 9.0375 5.52883 9.10215 5.34302 9.22788C5.16113 9.35096 5.04765 9.51037 4.97816 9.65143C4.90967 9.79048 4.87823 9.92259 4.86304 10.0151C4.85522 10.0627 4.8511 10.1036 4.84891 10.1347C4.84781 10.1504 4.84718 10.1639 4.84682 10.1748L4.84646 10.1893L4.84639 10.1952L4.84638 10.1977L4.84637 10.1989L4.84637 10.1995C4.84637 10.1997 4.84637 10.2 5.40887 10.2Z"
                stroke="#5A5A5A"
                strokeWidth="1.125"
              />
            </svg>

            <p>유형 : {type}</p>
          </div>
          <div className="h-5 flex gap-2 items-center body-3 text-neutrals-1000">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 2.25002C0 0.750095 1.00727 0 2.25002 0C3.49277 0 4.50004 0.750095 4.50004 2.25002C4.50004 3.74995 2.62494 5.99997 2.25002 5.99997C1.87511 5.99997 0 3.75021 0 2.25002ZM2.24974 3.37502C2.87107 3.37502 3.37476 2.87133 3.37476 2.25C3.37476 1.62868 2.87107 1.12499 2.24974 1.12499C1.62842 1.12499 1.12473 1.62868 1.12473 2.25C1.12473 2.87133 1.62842 3.37502 2.24974 3.37502ZM2.99968 2.25081C2.99968 2.66502 2.66389 3.00081 2.24968 3.00081C1.83547 3.00081 1.49969 2.66502 1.49969 2.25081C1.49969 1.8366 1.83547 1.50082 2.24968 1.50082C2.66389 1.50082 2.99968 1.8366 2.99968 2.25081Z"
                fill="#5A5A5A"
              />
              <path
                d="M0 6.375C0 6.16789 0.167892 6 0.374998 6H5.62497C5.83208 6 5.99997 6.16789 5.99997 6.375V9.37498C5.99997 9.58209 5.83208 9.74998 5.62497 9.74998H3.74998V11.25H11.6249C11.832 11.25 11.9999 11.4179 11.9999 11.625C11.9999 11.8321 11.832 12 11.6249 12H3.37498C3.16788 12 2.99998 11.8321 2.99998 11.625V9.37498C2.99998 9.16788 3.16788 8.99998 3.37498 8.99998H5.24997V6.75H0.374998C0.167892 6.75 0 6.5821 0 6.375Z"
                fill="#5A5A5A"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.75002 5.25C8.50727 5.25 7.5 6.00009 7.5 7.50002C7.5 9.00021 9.37511 11.25 9.75002 11.25C10.1249 11.25 12 8.99995 12 7.50002C12 6.00009 10.9928 5.25 9.75002 5.25ZM10.8747 7.5C10.8747 8.12133 10.3711 8.62502 9.74973 8.62502C9.1284 8.62502 8.62472 8.12133 8.62472 7.5C8.62472 6.87868 9.1284 6.37499 9.74973 6.37499C10.3711 6.37499 10.8747 6.87868 10.8747 7.5Z"
                fill="#5A5A5A"
              />
            </svg>

            <p>국가유산과의 거리 : {distance} km</p>
          </div>
        </div>
      </div>
    </div>
  );
}
