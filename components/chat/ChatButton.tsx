import MessageIcon from '../icons/MessageIcon';

type Props = {
  onClick?: () => void;
};

export default function ChatButton({ onClick }: Props) {
  return (
    <div
      className="h-full px-4 py-3 shadow-md rounded-[32px] bg-primary-0 flex items-center gap-2"
      onClick={onClick}
    >
      <MessageIcon />
      <p className="headline text-primary-1000">지기톡</p>
    </div>
  );
}
