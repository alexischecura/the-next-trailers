import Link from 'next/link';

function Logo() {
  return (
    <Link href="/">
      <h2 className="flex flex-col text-white uppercase">
        <span className="text-xl">The Next</span>
        <span className="font-bold text-3xl uppercase leading-4 tracking-tight">
          Trailers
        </span>
      </h2>
    </Link>
  );
}

export default Logo;
