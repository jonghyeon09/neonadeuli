import AvartaIcon from '../icons/AvartaIcon';

export default function User() {
  return (
    <div className="w-full py-[10px] flex items-center">
      <div className="mr-[10px]">
        <AvartaIcon></AvartaIcon>
      </div>
      <p>{localStorage.getItem('nickname')}</p>
    </div>
  );
}
