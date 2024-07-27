import DownArrowIcon from '../icons/DownArrowIcon';

type Props = {
  isOpen: boolean;
  text: string;
  onClick: () => void;
};

export default function SummaryButton({
  isOpen = false,
  text = '',
  onClick,
}: Props) {
  return (
    <button
      className={`w-full flex justify-center items-center h-[24px] gap-2`}
      onClick={onClick}
    >
      <div className={`${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        <DownArrowIcon></DownArrowIcon>
      </div>
      <p className="text-[12px] text-neutrals-1100">{text}</p>
    </button>
  );
}
