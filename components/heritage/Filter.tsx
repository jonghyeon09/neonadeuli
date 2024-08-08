import { AreaCode } from '@/types/api';
import CheckIcon from '../icons/CheckIcon';
import CloseIcon from '../icons/CloseIcon';
import Modal from '../modal/Modal';
import Button from '../common/Button';
import ResetIcon from '../icons/ResetIcon';

const regions = [
  {
    name: '서울',
    code: AreaCode.서울,
  },
  {
    name: '부산',
    code: AreaCode.부산,
  },
  {
    name: '대구',
    code: AreaCode.대구,
  },
  {
    name: '인천',
    code: AreaCode.인천,
  },
  {
    name: '광주',
    code: AreaCode.광주,
  },
  {
    name: '대전',
    code: AreaCode.대전,
  },
  {
    name: '울산',
    code: AreaCode.울산,
  },
  {
    name: '경기',
    code: AreaCode.경기,
  },
  {
    name: '강원',
    code: AreaCode.강원,
  },
  {
    name: '충남',
    code: AreaCode.충남,
  },
  {
    name: '전북',
    code: AreaCode.전북,
  },
  {
    name: '전남',
    code: AreaCode.전남,
  },
  {
    name: '경북',
    code: AreaCode.경북,
  },
  {
    name: '경남',
    code: AreaCode.경남,
  },
  {
    name: '세종',
    code: AreaCode.세종,
  },
  {
    name: '제주',
    code: AreaCode.제주,
  },
];

export default function Filter({
  code,
  onClick,
  onReset,
  onSearch,
  onClose,
}: {
  code: number | null;
  onClick: (code: number) => void;
  onSearch: () => void;
  onReset: () => void;
  onClose: () => void;
}) {
  return (
    <Modal>
      <div className="flex items-end w-full h-full">
        <div className="bg-white w-full flex flex-col rounded-[20px] rounded-b-none">
          <div className="flex flex-col p-5">
            <div className="flex justify-between mb-2">
              <p className="heading">필터</p>
              <button onClick={onClose}>
                <CloseIcon />
              </button>
            </div>
            <div className="h-[1px] w-full bg-neutrals-200 mb-5"></div>
            <div className="flex flex-col gap-3">
              <p className="headline">지역별</p>
              <div className="flex flex-wrap gap-[10px]">
                {regions.map((region) => (
                  <button
                    key={region.code}
                    type="button"
                    onClick={() => onClick(region.code)}
                  >
                    <div
                      className={`p-2 border-[1px] rounded-[20px] flex items-center justify-center gap-[2px] ${
                        region.code == code
                          ? 'bg-primary-300 border-primary-100 text-primary-1000'
                          : 'border-neutrals-100 text-neutrals-800'
                      }`}
                    >
                      <CheckIcon
                        stroke={region.code == code ? '#664003' : '#787878'}
                      />
                      <p className="body-2">{region.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 flex gap-5">
            <Button
              className="rounded-lg bg-neutrals-100 flex gap-1 items-center justify-center flex-1"
              onClick={onReset}
            >
              <ResetIcon />
              <p>초기화</p>
            </Button>
            <Button
              className="rounded-lg bg-black text-neutrals-100 flex-[2]"
              onClick={onSearch}
            >
              결과보기
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
