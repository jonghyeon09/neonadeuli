type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  className?: string;
};

export default function Button({
  text,
  onClick,
  disabled = false,
  type = 'button',
  style,
  className = '',
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`rounded text-sm py-3 w-full ${className}`}
    >
      {text}
    </button>
  );
}
