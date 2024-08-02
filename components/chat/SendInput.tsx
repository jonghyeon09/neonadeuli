import { forwardRef } from 'react';

type Props = {
  value: string;
  ref: HTMLInputElement;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
};

function SendInput(
  { value, onChange, onFocus, onBlur }: Props,
  ref?: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      className="focus:outline-none bg-transparent flex-1 h-[20px]"
      type="text"
      id="message"
      ref={ref}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}

export default forwardRef(SendInput);
