import Link from 'next/link';
import BackArrowIcon from '../icons/BackArrowIcon';

export default function DetailHeader({ title }: { title: string }) {
  return (
    <div className="bg-white flex justify-center items-center w-full h-[--h-header] max-w-screen-sm fixed px-5 z-10">
      <Link href={'/'} scroll={false} className="absolute left-5">
        <BackArrowIcon></BackArrowIcon>
      </Link>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
