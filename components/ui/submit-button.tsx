'use client'

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export default function SubmitButton({ className, variant, size, asChild, children, ...props }: React.ComponentProps<typeof Button>) {
  const status = useFormStatus();
  return (
    <Button className={className} variant={variant} size={size} asChild={asChild} disabled={status.pending} {...props}>
      {status.pending ? "Carregando..." : children}
    </Button>
  )
}