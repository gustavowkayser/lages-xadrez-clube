"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { X } from "lucide-react";
import Form from "next/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import registerPartnerAction from "@/app/(main)/socios/registerPartnerAction";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useFormStatus } from 'react-dom'
import SubmitButton from "@/components/ui/submit-button";

export default function AddPartnerForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    const response = await registerPartnerAction(formData);

    if (response.status === 200) {
      router.refresh();
      toast.success("Sócio cadastrado com sucesso!");
      setModalOpen(false);
    } else {
      alert(response.message);
    }
  }

  return (
    <>
      {modalOpen && (
        <div className="bg-black/60 bg-cover w-full max-w-screen h-full fixed top-0 left-0">
          <Card className="w-[40rem] h-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5">
            <CardHeader>
              <CardTitle className="text-2xl">Cadastro de Sócio</CardTitle>
              <X
                className="cursor-pointer absolute right-5 top-5"
                onClick={() => {
                  setModalOpen(false);
                }}
              />
            </CardHeader>
            <CardContent>
                <Form action={onSubmit} className="flex flex-col gap-4">
                  <div>
                    <Label className="mb-2">Nome</Label>
                    <Input placeholder="Nome do Sócio" type='text' name='name'/>
                  </div>
                  <div>
                    <Label className="mb-2">E-mail</Label>
                    <Input placeholder="E-mail do Sócio" type='email' name='email'/>
                  </div>
                  <div>
                    <Label className="mb-2">Telefone para Contato</Label>
                    <Input placeholder="Telefone Celular do Sócio" type='text' name='phone'/>
                  </div>
                  <SubmitButton size='lg' className="cursor-pointer mt-7" type='submit'>Adicionar Sócio</SubmitButton>
                </Form>
            </CardContent>
          </Card>
        </div>
      )}
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        className="cursor-pointer"
        size="lg"
      >
        Adicionar Sócio
      </Button>
      <Toaster />
    </>
  );
}
