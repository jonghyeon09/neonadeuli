type Props = {
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

export default function Button({
  onClick,
  disabled = false,
  type = 'button',
  style,
  className = '',
  children,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`rounded text-sm py-3 w-full ${className}`}
    >
      {children}
    </button>
  );
}
