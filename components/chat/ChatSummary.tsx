export default function ChatSummary({
  course = [],
  date,
  keywords = [],
  name,
}: {
  date: string;
  name: string;
  course: string[];
  keywords: string[];
}) {
  const icon = (
    <div className="w-4 h-4 flex justify-center items-center">
      <svg
        width="6"
        height="8"
        viewBox="0 0 6 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.75038 3.83359C5.86913 3.91275 5.86913 4.08725 5.75038 4.16641L0.69443 7.53705C0.519438 7.65371 0.306066 7.45589 0.409176 7.27258L2.19485 4.09809C2.22909 4.03721 2.22909 3.96287 2.19485 3.90199L0.409163 0.727408C0.306056 0.544104 0.519428 0.346285 0.694418 0.462945L5.75038 3.83359Z"
          fill="#FABC58"
        />
      </svg>
    </div>
  );

  return (
    <div className="radius-m bg-white p-5">
      <div className="flex flex-col gap-4">
        <p className="text-neutrals-1400 body-1 text-center">대화 내용 요약</p>
        <div className="bg-[#dadada] w-full h-[1px]"></div>
        <div className="flex flex-col gap-4">
          <div className="body-3 font-semibold flex gap-2">
            <p>대화 날짜</p>
            <p className="font-normal">{date}</p>
          </div>
          <div className="body-3 font-semibold flex gap-2">
            <p>국가유산 이름</p>
            <p className="font-normal">{name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="body-3 font-semibold">다녀온 국가유산</p>
            <div className="flex gap-[6px] flex-wrap bg-neutrals-100 text-neutrals-1300 body-3 p-[10px] rounded">
              {course.map((str, i) => (
                <>
                  <p key={str}>{str}</p>
                  {course.length == i + 1 ? null : icon}
                </>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="body-3 font-semibold">요약 한마디</p>
            <div className="flex flex-wrap gap-[6px] bg-neutrals-100 p-[10px] rounded">
              {keywords.map((str) => (
                <>
                  <div className="h-[30px] flex items-center bg-primary-100 px-2">
                    <p className="body-3 text-primary-1000">{str}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
