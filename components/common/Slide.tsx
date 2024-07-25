type Props = {};

export default function Slide({}: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        <div className="w-[150px] h-[120px] bg-[#d9d9d9] rounded-xl"></div>
        <p>경복궁</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-[150px] h-[120px] bg-[#d9d9d9] rounded-xl"></div>
        <p>경복궁</p>
      </div>
    </div>
  );
}
