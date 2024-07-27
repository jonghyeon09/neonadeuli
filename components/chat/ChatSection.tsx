type Props = {
  children: React.ReactNode;
  sendComponent: React.ReactNode;
};

export default function ChatSection({ children, sendComponent }: Props) {
  return (
    <div className="bg-neutrals-200 relative flex flex-1">
      <div className="w-full flex flex-col gap-5 px-5 absolute bottom-0  pb-[56px]">
        <p className="text-center body-3 text-neutrals-1000">
          경복궁에 오신 것을 환영합니다.
          <br />
          이곳에 계시는 동안에만 대화가 가능하니 참고해 주세요 :)
        </p>
        {children}
      </div>
      {sendComponent}
    </div>
  );
}
