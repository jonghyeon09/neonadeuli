import { Location } from '@/types/course';
import CurrentLocationIcon from '../icons/CurrentLocationIcon';
import SummaryButton from '../common/SummaryButton';
import LocationIcon from '../icons/LocationIcon';
import DownArrowIcon from '../icons/DownArrowIcon';

type Props = {
  course: Location[][];
  location: string;
  locationId: number;
  lastId: number;
  isOpen: boolean;
  onOpen: () => void;
  onClick: (location: Location, rowIndex: number, colIndex: number) => void;
};

export default function LineMap({
  course,
  location = '광화문',
  locationId = 1,
  lastId,
  isOpen = true,
  onOpen,
  onClick,
}: Props) {
  const locationIcon = (
    visited: boolean,
    id: number,
    name: string,
    rowIndex: number,
    colIndex: number
  ) => {
    if (id == locationId) {
      return <CurrentLocationIcon />;
    }

    if (rowIndex == 1) {
      return (
        <div className="rotate-180 w-full h-full">
          <LocationIcon visited={visited} isLast={false} />
        </div>
      );
    }

    if (id == lastId) {
      return <LocationIcon visited={visited} isLast />;
    }
    return <LocationIcon visited={visited} isLast={false} />;
  };

  return (
    <div className="bg-white max-w-screen-sm w-full drop-shadow-md rounded-lg fixed top-[--h-header] p-5 flex justify-center z-50 min-h-[--h-tour]">
      {/* <button className="absolute right-5" onClick={onOpen}>
        <div className={`${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <DownArrowIcon></DownArrowIcon>
        </div>
      </button> */}

      <div className="flex flex-col gap-2 items-center">
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
                <button
                  key={colIndex}
                  onClick={() => onClick(col, rowIndex, colIndex)}
                >
                  <div className="relative w-[60px] h-[64px] flex flex-col items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#6f6f6f]/20 flex justify-center items-center"></div>
                    <div className="z-10 w-4 h-4 absolute flex justify-center items-center rounded-full drop-shadow">
                      {locationIcon(
                        col.visited,
                        col.id,
                        col.name,
                        rowIndex,
                        colIndex
                      )}
                    </div>
                    <p className="text-[13px] w-full font-semibold line-clamp-2 text-center">
                      {col.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* {isOpen && (
          <div className="w-full flex gap-[79px] justify-between px-5">
            <Button
              className="w-[128px] h-[36px] rounded-lg bg-[#2e2e2e] flex items-center justify-center gap-1"
              style={!prev ? { backgroundColor: '#eeeeee' } : {}}
              disabled={!prev}
              onClick={onPrev}
            >
              <div className="rotate-180">
                <NextArrowIcon
                  SVGAttributes={!prev ? { fill: '#b8b8b8' } : {}}
                />
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
        )} */}

        <div className="w-full min-h-[1px] bg-neutrals-100"></div>
        <SummaryButton
          isOpen={isOpen}
          text={isOpen ? '지도 접기' : '지도 펼치기'}
          onClick={onOpen}
        />
      </div>
    </div>
  );
}
