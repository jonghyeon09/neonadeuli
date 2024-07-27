import { Course } from '@/types/course';
import Button from '../common/Button';
import NextArrowIcon from '../icons/NextArrowIcon';
import CurrentLocationIcon from '../icons/CurrentLocationIcon';
import SummaryButton from '../common/SummaryButton';
import NextLocationIcon from '../icons/NextLocationIcon';
import PrevLocationIcon from '../icons/PrevLocationIcon';
import LastLocation from '../icons/LastLocation';

type Props = {
  course: Course;
  location: string;
  locationId: number;
  lastId: number;
  prev: boolean;
  next: boolean;
  isOpen: boolean;
  onNext: () => void;
  onPrev: () => void;
  onOpen: () => void;
};

export default function LineMap({
  course,
  location = '광화문',
  locationId = 1,
  lastId,
  prev = false,
  next = true,
  isOpen = true,
  onNext,
  onPrev,
  onOpen,
}: Props) {
  const locationIcon = (
    id: number,
    name: string,
    rowIndex: number,
    colIndex: number
  ) => {
    if (id == locationId) {
      return <CurrentLocationIcon />;
    }

    if (rowIndex == 1 && id < locationId) {
      return (
        <div className="rotate-180 w-full h-full">
          <PrevLocationIcon />
        </div>
      );
    }
    if (rowIndex == 1) {
      return (
        <div className="rotate-180 w-full h-full">
          <NextLocationIcon />
        </div>
      );
    }
    if (id < locationId) {
      return <PrevLocationIcon />;
    }
    if (id == lastId) {
      return <LastLocation />;
    }
    return <NextLocationIcon />;
  };

  return (
    <div className="bg-white max-w-screen-sm w-full drop-shadow-md rounded-lg fixed top-[58px] p-5 flex justify-center">
      <div className="w-[335px] flex flex-col gap-2 items-center">
        <div
          className={`relative px-[10px] flex flex-col gap-4 items-center select-none ${
            isOpen ? '' : 'h-[64px] overflow-hidden'
          }`}
        >
          <div className="z-10 absolute right-1 top-[5px] w-[33px] h-[84px] border-4 border-[#616161] rounded-tr-[33px] rounded-br-[33px] border-l-0"></div>
          <div className="z-10 absolute left-1 top-[85px] w-[33px] h-[84px] border-4 border-[#616161] rounded-tl-[33px] rounded-bl-[33px] border-r-0"></div>

          {course.map((row, rowIndex) => (
            <div className="relative w-[316px] flex gap-1" key={rowIndex}>
              <div className="w-[265px] h-1 bg-[#616161] rounded-sm absolute left-[25px] right-[14.67%] top-[7.83%]"></div>

              {row.map((col, colIndex) => (
                <div
                  className="relative w-[60px] h-[64px] flex flex-col items-center gap-2"
                  key={colIndex}
                >
                  <div className="w-4 h-4 rounded-full bg-[#6f6f6f]/20 flex justify-center items-center"></div>
                  <div className="z-10 w-4 h-4 absolute flex justify-center items-center rounded-full drop-shadow">
                    {locationIcon(col.id, col.name, rowIndex, colIndex)}
                  </div>
                  <p className="text-[13px] w-full font-semibold line-clamp-2 text-center">
                    {col.name}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="w-full flex gap-[79px] justify-between px-5">
          <Button
            className="w-[128px] h-[36px] rounded-lg bg-[#2e2e2e] flex items-center justify-center gap-1"
            style={!prev ? { backgroundColor: '#eeeeee' } : {}}
            disabled={!prev}
            onClick={onPrev}
          >
            <div className="rotate-180">
              <NextArrowIcon SVGAttributes={!prev ? { fill: '#b8b8b8' } : {}} />
            </div>
            <p
              className="text-white text-[13px]"
              style={!prev ? { color: '#b8b8b8' } : {}}
            >
              이전 장소
            </p>
          </Button>
          <Button
            className="w-[128px] h-[36px] rounded-lg bg-[#2e2e2e] flex items-center justify-center gap-1"
            style={!next ? { backgroundColor: '#eeeeee' } : {}}
            disabled={!next}
            onClick={onNext}
          >
            <p
              className="text-white text-[13px]"
              style={!next ? { color: '#b8b8b8' } : {}}
            >
              다음 장소
            </p>
            <NextArrowIcon SVGAttributes={!next ? { fill: '#b8b8b8' } : {}} />
          </Button>
        </div>
        <div className="w-full min-h-[1px] bg-neutrals-100"></div>
        <SummaryButton
          isOpen={isOpen}
          text="지도 접기"
          onClick={onOpen}
        ></SummaryButton>
      </div>
    </div>
  );
}
