"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import loginAction from "@/app/(auth)/log-in/loginAction";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const inputs = [
  {
    label: "E-mail",
    placeholder: "E-mail",
    name: "email",
    type: "email",
  },
  {
    label: "Senha",
    placeholder: "Senha",
    name: "password",
    type: "password",
  },
];

export default function LogIn() {
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    const user = await loginAction(formData);

    if (user.status !== 200) {
      toast.error(user.message);
      return;
    }

    router.push("/");
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-3xl">Log-In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form action={onSubmit}>
          {inputs.map((input) => (
            <div key={input.name}>
              <Label
                className="text-xl mb-2"
                htmlFor={input.name}
              >
                {input.label}
              </Label>
              <Input
                id={input.name}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                className="mb-4"
              />
            </div>
          ))}
          <Button
            type="submit"
            className="text-xl font-normal p-2 cursor-pointer w-full mt-4"
          >
            Cadastrar
          </Button>
        </Form>
        <Toaster />
      </CardContent>
    </Card>
  );
}
