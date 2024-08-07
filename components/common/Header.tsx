import Logo from '../icons/Logo';
import MenuIcon from '../icons/MenuIcon';
import SearchIcon from '../icons/SearchIcon';

type Props = {
  onHeritage?: () => void;
  onMenu?: () => void;
};

export default function Header({ onHeritage, onMenu }: Props) {
  return (
    <header className="bg-white relative h-[56px] w-full flex justify-between items-center px-5">
      <p className="text-center">
        <Logo />
      </p>

      <div className="flex gap-5">
        <button onClick={onHeritage}>
          <SearchIcon />
        </button>
        <button onClick={onMenu}>
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
