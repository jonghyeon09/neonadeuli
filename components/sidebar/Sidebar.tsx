import { useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import ItemArrowIcon from '../icons/ItemArrowIcon';
import User from './User';
import { useModalStore } from '@/store';
import Link from 'next/link';

type Props = {
  onClose?: () => void;
};

export default function Sidebar({ onClose }: Props) {
  const [items, setItems] = useState(['대화 목록', '국가유산 검색']);
  const { isSidebar } = useModalStore();

  return (
    <>
      {isSidebar && (
        <div className="w-full h-screen absolute top-0 left-0 z-[100]">
          <div className="bg-black/50 max-w-screen-sm h-screen mx-auto">
            <nav
              className={`w-[250px] h-screen bg-white absolute top-0 right-0 px-5 pt-[84px] transition-transform ${
                isSidebar ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <button className="absolute right-5 top-10" onClick={onClose}>
                <CloseIcon />
              </button>
              <User />
              <div className="w-full h-[1px] bg-[#d9d9d9] my-5"></div>
              <ul className="flex flex-col gap-[10px]">
                {items.map((el, i) => (
                  <li key={el}>
                    <Link href={i == 0 ? '/chat-history' : '/heritage'}>
                      <button className="w-full flex items-center justify-between h-11">
                        <p className="text-sm">{el}</p>
                        <ItemArrowIcon />
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
