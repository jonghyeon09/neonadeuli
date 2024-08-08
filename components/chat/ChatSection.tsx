type Props = {
  children?: React.ReactNode;
  sendComponent: React.ReactNode;
  isQuiz: boolean;
};

export default function ChatSection({
  children,
  isQuiz,
  sendComponent,
}: Props) {
  return (
    <div className="bg-neutrals-200 relative flex flex-1 pt-[calc(var(--h-tour)+20px)]">
      <div
        className={`w-full flex flex-col justify-end gap-6 px-4 relative bottom-0 pb-[--h-send] ${
          isQuiz ? 'mb-[120px]' : 'mb-5'
        }`}
      >
        <p className="text-center body-3 text-neutrals-1000 mb-5">
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
