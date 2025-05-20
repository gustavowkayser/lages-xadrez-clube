'use client'

import { Button } from "./ui/button"
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { X } from "lucide-react";

export default function AddPartnerForm() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      { modalOpen && (
        <div className="bg-black/60 bg-cover w-full max-w-screen h-full fixed top-0 left-0">
          <Card className="w-[40rem] h-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5">
            <CardHeader>
              <CardTitle className="text-2xl">Cadastro de Sócio</CardTitle>
              <X className="cursor-pointer absolute right-5 top-5" onClick={() => {setModalOpen(false)}}/>
            </CardHeader>
          </Card>
        </div>
      )}
      <Button onClick={() => {setModalOpen(true)}} className="cursor-pointer" size='lg'>Adicionar Sócio</Button>
    </>
  )
}