type Props = {
  onClick?: () => void;
};

export default function ChatButton({ onClick }: Props) {
  return (
    <div
      className="relative w-[75px] h-[66px] drop-shadow-md"
      onClick={onClick}
    >
      <button className="w-full h-full rounded-full bg-[#d9d9d9]">
        <p className="text-xl font-semibold"></p>챗봇
      </button>
      <div className="w-4 h-4 rounded-full bg-[#ff0101] absolute top-0 right-0"></div>
    </div>
  );
}
