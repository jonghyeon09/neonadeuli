import MessageIcon from '../icons/MessageIcon';

type Props = {
  text: string;
  onClick?: () => void;
};

export default function NewButton({ text, onClick }: Props) {
  return (
    <button onClick={onClick}>
      <div className="flex gap-[10px] justify-center items-center h-[64px] bg-primary-0 rounded-[33px] p-5 shadow-lg">
        <MessageIcon></MessageIcon>
        <p className="heading text-primary-1000">{text}</p>
      </div>
    </button>
  );
}
