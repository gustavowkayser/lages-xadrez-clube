"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import registerAction from "@/app/(auth)/sign-up/registerAction";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import GoogleIcon from "@/components/ui/icons/google-icon";
import { signIn } from "@/auth";

const inputs = [
  {
    label: "Nome",
    placeholder: "Nome",
    name: "name",
    type: "text",
  },
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

export default function SignUp() {
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    const user = await registerAction(formData);

    if (user.status !== 200) {
      toast.error(user.message);
      return;
    }

    router.push("/");
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Cadastro</CardTitle>
      </CardHeader>
      <CardContent>
        <Form action={onSubmit}>
          {inputs.map((input) => (
            <div key={input.name}>
              <Label className="mb-2" htmlFor={input.name}>
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
            className="cursor-pointer w-full mt-4"
            size="lg"
          >
            Cadastrar
          </Button>
        </Form>
        <Button
          className="w-full cursor-pointer mt-4"
          size="lg"
          variant="outline"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <GoogleIcon />
          Cadastrar com o Google
        </Button>
        <Toaster />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center">
          Já tem uma conta?{" "}
          <a href="/log-in" className="text-blue-500 hover:underline">
            Entrar
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
