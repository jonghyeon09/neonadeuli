import Link from 'next/link';
import BackArrowIcon from '../icons/BackArrowIcon';

export default function DetailHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-center items-center w-full h-[56px] relative px-5">
      <Link href={'/'} className="absolute left-5">
        <BackArrowIcon></BackArrowIcon>
      </Link>
      <p className="text-xl font-semibold">{title}</p>
    </div>
  );
}
