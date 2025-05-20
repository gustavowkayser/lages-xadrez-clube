import { auth } from "@/auth";
import AddPartnerForm from "@/components/add-partner-form";
import { Role } from "@prisma/client";

export default async function Socios() {
  const session = await auth();

  const socios = [
    { 
      id: 1,
      name: "Sócio 1",
      email: "socio1@gmail.com",
      phone: "123456789",
      address: "Rua 1, Bairro 1, Cidade 1",
      status: "Ativo",
    },
    { 
      id: 2,
      name: "Sócio 2",
      email: "socio1@gmail.com",
      phone: "123456789",
      address: "Rua 1, Bairro 1, Cidade 1",
      status: "Ativo",
    },
    { 
      id: 3,
      name: "Sócio 3",
      email: "socio1@gmail.com",
      phone: "123456789",
      address: "Rua 1, Bairro 1, Cidade 1",
      status: "Ativo",
    },
    { 
      id: 4,
      name: "Sócio 4",
      email: "socio1@gmail.com",
      phone: "123456789",
      address: "Rua 1, Bairro 1, Cidade 1",
      status: "Ativo",
    },
  ]

  return (
    <div className="flex flex-col w-full h-full p-5">
      <h1 className="text-3xl font-bold">Sócios</h1>
      <p className="mt-2 text-gray-600">
        Aqui você pode ver a lista de sócios do Lages Xadrez Clube.
      </p>
      <div className="w-full bg-gray-100 h-[2px] my-4 rounded-full"/>
      { session?.user?.role === Role.ADMIN && <AddPartnerForm />}
      <div>
        {socios.map((socio) => (
          <div key={socio.id} className="flex flex-col bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold">{socio.name}</h2>
            <p className="text-gray-600">Email: {socio.email}</p>
            <p className="text-gray-600">Telefone: {socio.phone}</p>
            <p className="text-gray-600">Endereço: {socio.address}</p>
            <p className="text-gray-600">Status: {socio.status}</p>
          </div> 
        ))}
      </div>
    </div>
  );
}