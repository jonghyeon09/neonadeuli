import AvartaIcon from '../icons/AvartaIcon';
import { useUserStore } from '@/store';

export default function User() {
  const { user } = useUserStore();
  return (
    <div className="w-full py-[10px] flex items-center">
      <div className="mr-[10px]">
        <AvartaIcon></AvartaIcon>
      </div>
      <p>{user?.username}</p>
    </div>
  );
}
