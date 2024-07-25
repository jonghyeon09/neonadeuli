import Image from 'next/image';

type Props = {
  text: string;
  src?: string;
  onClick: () => void;
};

export default function SlideItem({ text, src = '', onClick }: Props) {
  return (
    <>
      <div className="flex gap-2 flex-col">
        <button
          className="relative overflow-hidden w-[150px] h-[120px] bg-[#d9d9d9] rounded-xl"
          onClick={onClick}
        >
          <Image src={src} alt="palace" fill sizes="(max-width:640) 150px" />
        </button>
        <p>{text}</p>
      </div>
    </>
  );
}
