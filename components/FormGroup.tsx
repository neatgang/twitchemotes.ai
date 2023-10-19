import { cn } from "@/lib/utils";

export function FormGroup(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className={cn("flex flex-col gap-1", props.className)}>
      {props.children}
    </div>
  );
}
