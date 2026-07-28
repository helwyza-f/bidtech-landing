export function StatCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
