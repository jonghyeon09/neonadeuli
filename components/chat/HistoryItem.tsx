import Image from 'next/image';

type Props = {
  name: string;
  message: string;
  time: string;
  src: string;
};

export default function HistoryItem({ name, message, time, src }: Props) {
  return (
    <>
      <div className="p-5 flex gap-3 border-b-[#f4f4f4] border-b-2">
        <div className="min-w-[48px]">
          <div className="bg-[#d9d9d9] rounded-xl w-[48px] h-[48px] mt-[10px] relative overflow-hidden">
            <Image src={src} alt="" fill sizes="48px" />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <p className="font-semibold">{name}</p>
          <p className="line-clamp-2 text-sm text-[#7f7f7f]">{message}</p>
        </div>
        <div className="flex min-w-[56px] text-[13px] text-[#b2b2b2]">
          <p>{time}</p>
        </div>
      </div>
      {/* <div className="w-full h-2 bg-[#f4f4f4]"></div> */}
    </>
  );
}
