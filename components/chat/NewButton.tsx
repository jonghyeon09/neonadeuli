import MessageIcon from '../icons/MessageIcon';

type Props = {
  text: string;
  onClick?: () => void;
};

export default function NewButton({ text, onClick }: Props) {
  return (
    <button onClick={onClick}>
      <div className="flex gap-[10px] justify-center items-center h-[64px] bg-[#d9d9d9] rounded-[33px] p-5 shadow-lg">
        <MessageIcon></MessageIcon>
        {text}
      </div>
    </button>
  );
}
