import { useEffect, useState } from 'react';
import ChatTooltip from './ChatTooltip';

export default function SendSection({
  children,
  optionComponent,
  choiceComponent,
}: {
  children: React.ReactNode;
  optionComponent?: JSX.Element;
  choiceComponent?: JSX.Element;
}) {
  const [isTooltip, setIstooltip] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setIstooltip(false), 3000);

    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <div className="fixed bottom-0 flex flex-col w-full max-w-screen-sm">
        {choiceComponent}
        <div className="py-2 px-3 bg-white flex items-center gap-2 border-b-[1px] border-neutrals-100">
          {isTooltip && <ChatTooltip />}
          {children}
        </div>
        {optionComponent}
      </div>
    </>
  );
}
