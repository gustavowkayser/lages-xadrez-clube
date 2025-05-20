"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deletePartnerAction } from "./registerPartnerAction";
import Form from "next/form";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, role }: { id: string, role: string | null }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deletePartnerAction(id, role);

    if (response.status === 200) {
      router.refresh();
      toast.success("Sócio deletado com sucesso!");
    } else {
      toast.error("Erro ao deletar sócio");
    }
  }

  return (
    <Form action={handleDelete}>
      <Button variant="destructive" size="lg" className="cursor-pointer">
        <Trash />
      </Button>
      <Toaster />
    </Form>
  );
}
