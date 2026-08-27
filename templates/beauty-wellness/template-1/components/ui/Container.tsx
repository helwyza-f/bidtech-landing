import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

export function Container({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("site-container", className)}
      {...props}
    >
      {children}
    </div>
  );
}