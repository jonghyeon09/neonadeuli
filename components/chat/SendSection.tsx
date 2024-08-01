import { useEffect, useState } from 'react';
import ChatTooltip from './ChatTooltip';

export default function SendSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTooltip, setIstooltip] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setIstooltip(false), 3000);

    return () => clearTimeout(id);
  }, []);

  return (
    <div className="py-2 px-3 fixed bottom-0 bg-white w-full max-w-screen-sm flex items-center gap-2">
      {isTooltip && <ChatTooltip />}
      {children}
    </div>
  );
}
