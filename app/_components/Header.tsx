import Logo from './Logo';
import SearchInput from './SearchInput';

function Header() {
  return (
    <nav className="flex justify-between mx-auto py-8 max-w-7xl">
      <Logo />
      <SearchInput />
    </nav>
  );
}

export default Header;
