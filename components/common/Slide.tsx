import Image from 'next/image';

type Props = {
  text: string;
  src: string;
};

export default function Slide({ text, src }: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        <div className="w-[150px] h-[120px] bg-[#d9d9d9] rounded-xl">
          <Image src={src} alt="palace" />
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}
