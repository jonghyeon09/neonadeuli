type Props = {
  onClick?: () => void;
};

export default function ChatButton({ onClick }: Props) {
  return (
    <div
      className="relative w-[90px] h-[64px] drop-shadow-md"
      onClick={onClick}
    >
      <button className="w-full h-full rounded-full bg-primary-0">
        <p className="title-2 text-primary-1000">챗봇</p>
      </button>
      {/* <div className="w-4 h-4 rounded-full bg-[#ff0101] absolute top-0 right-0"></div> */}
    </div>
  );
}
