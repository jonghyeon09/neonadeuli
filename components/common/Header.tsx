import MenuIcon from '../icons/MenuIcon';

type Props = {
  onMenu?: () => void;
};

export default function Header({ onMenu }: Props) {
  return (
    <header className="bg-white relative h-[56px] w-full flex justify-center items-center px-5">
      <p className="text-center">너나들이</p>
      <button className="absolute right-5" onClick={onMenu}>
        <MenuIcon />
      </button>
    </header>
  );
}
