type Props = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SendInput({ value, onChange }: Props) {
  return (
    <input
      className="focus:outline-none bg-transparent flex-1"
      type="text"
      id="message"
      value={value}
      onChange={onChange}
    />
  );
}
