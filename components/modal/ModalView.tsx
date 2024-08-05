type Props = {
  children?: React.ReactNode;
};

export default function ModalView({ children }: Props) {
  return (
    <div className="w-full max-w-[375px] bg-white flex justify-center items-center flex-col rounded-xl p-5">
      {children}
    </div>
  );
}
