import MenuIcon from '../icons/MenuIcon';
import SearchIcon from '../icons/SearchIcon';

export default function Header() {
  return (
    <header className="h-[56px] w-full flex justify-between items-center px-5 bg-pink-50">
      <MenuIcon />
      <SearchIcon />
    </header>
  );
}
