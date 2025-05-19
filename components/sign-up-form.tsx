"use client";

import { signUpSchema, tsignUpSchema } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<tsignUpSchema>({
    // connnect zod to react-hook-form via zodResolver
    resolver: zodResolver(signUpSchema),
  });

  return (
    <div>

    </div>
  );
}
