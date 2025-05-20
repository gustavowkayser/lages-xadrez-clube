import { auth } from "@/auth";
import AddPartnerForm from "@/app/(main)/socios/add-partner-form";
import db from "@/lib/db";
import { Role } from "@prisma/client";
import Image from "next/image";
import BlankProfile from "@/public/blank-profile.png";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import DeleteButton from "./delete-button";


export default async function Socios() {
  const session = await auth();
  const partners = await db.partner.findMany();

  return (
    <div className="flex flex-col w-full h-full p-5">
      <h1 className="text-3xl font-bold">Sócios</h1>
      <p className="mt-2 text-gray-600">
        Aqui você pode ver a lista de sócios do Lages Xadrez Clube.
      </p>
      <div className="w-full bg-gray-100 h-[2px] my-4 rounded-full" />
      {session?.user?.role === Role.ADMIN && <AddPartnerForm/>}
      <div className="mt-6">
        {partners.map((socio) => (
          <div
            key={socio.id}
            className="w-full flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4"
          >
            <div className="flex flex-row items-center gap-4">
              <Image
                src={socio.image || BlankProfile}
                alt="Imagem do Sócio"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="text-xl font-semibold">{socio.name}</h2>
            </div>
            <div>
              <p className="text-gray-600">Email: {socio.email}</p>
              <p className="text-gray-600">Telefone: {socio.phone}</p>
            </div>
            { session?.user.role === 'ADMIN' && <div className="flex flex-row-reverse items-center gap-2">
              <DeleteButton id={socio.id} role={session?.user?.role}/>
              <Button variant='outline' size='lg' className="cursor-pointer"><Pencil /></Button>
            </div> }
          </div>
        ))}
      </div>
    </div>
  );
}
