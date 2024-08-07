import ModalView from './ModalView';

type Props = {
  children?: React.ReactNode;
};

export default function Modal({ children }: Props) {
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[100]">
      <div className="bg-black/50 max-w-screen-sm h-screen mx-auto">
        <div className="w-full h-full flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
