"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import loginAction from "@/app/(auth)/log-in/loginAction";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerGoogleAction } from "../sign-up/registerAction";
import GoogleIcon from "@/components/ui/icons/google-icon";

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

  const googleSignIn = async () => {
    await registerGoogleAction();
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Entrar</CardTitle>
      </CardHeader>
      <CardContent>
        <Form action={onSubmit}>
          {inputs.map((input) => (
            <div key={input.name}>
              <Label
                className="mb-2"
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
            className="cursor-pointer w-full mt-4"
            size='lg'
          >
            Entrar
          </Button>
        </Form>
        <Form action={googleSignIn} className="w-full mt-4">
          <Button className="w-full cursor-pointer" size='lg' variant='outline'><GoogleIcon />Entrar com o Google</Button>
        </Form>
        <Toaster />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center">
          Não tem uma conta?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Cadastre-se
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
