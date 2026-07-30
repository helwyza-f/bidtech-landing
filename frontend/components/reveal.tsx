type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
