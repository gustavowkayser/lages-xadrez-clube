import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1 className="text-6xl font-bold text-center">
        Bem vindo, <br />{session?.user?.name?.split(' ')[0] || "Usuário"}!👋
      </h1>
    </main>
  );
}
