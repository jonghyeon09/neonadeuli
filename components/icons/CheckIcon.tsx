export default function CheckIcon({ stroke = '#787878' }: { stroke: string }) {
  return (
    <div className="w-5 h-5 flex justify-center items-center">
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 4L4.26644 6.93979C4.30447 6.97402 4.3622 6.97402 4.40023 6.93979L11 1"
          stroke={stroke}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
