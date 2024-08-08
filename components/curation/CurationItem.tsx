import Image from 'next/image';

export default function CurationItem({
  src = '',
  count,
  date,
  title,
}: {
  src: string;
  date: string;
  count: number;
  title: string;
}) {
  return (
    <div className="w-[270px] h-[360px] shadow-sm relative radius-m overflow-hidden">
      <Image alt="" src={src} fill sizes="360px" priority />
      <div className="absolute bottom-0 w-full h-[135px] p-5 bg-gradient">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 body-3">
            <div className="bg-black/50 px-[6px] py-1 rounded text-white">
              <p>{date}</p>
            </div>
            <div className="bg-black/50 px-[6px] py-1 rounded flex gap-1 items-center text-white">
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
                  d="M4.50006 0C2.01455 0 0 1.5002 0 4.50007C0 7.50046 3.75022 12 4.50006 12C5.24989 12 9.00011 7.49993 9.00011 4.50007C9.00011 1.5002 6.98557 0 4.50006 0ZM6.75027 4.50108C6.75027 5.74374 5.7429 6.75112 4.50024 6.75112C3.25759 6.75112 2.25021 5.74374 2.25021 4.50108C2.25021 3.25843 3.25759 2.25105 4.50024 2.25105C5.7429 2.25105 6.75027 3.25843 6.75027 4.50108Z"
                  fill="white"
                />
                <path
                  d="M4.5 6.00244C5.32842 6.00244 5.99999 5.33087 5.99999 4.50244C5.99999 3.67401 5.32842 3.00244 4.5 3.00244C3.67157 3.00244 3 3.67401 3 4.50244C3 5.33087 3.67157 6.00244 4.5 6.00244Z"
                  fill="#FEF2DE"
                />
              </svg>
              <p>{count}</p>
            </div>
          </div>
          <p className="title-2 text-white text-left">{title}</p>
        </div>
      </div>
    </div>
  );
}
