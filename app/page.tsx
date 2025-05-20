import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return <div>Session: {(session?.user?.name as string) || "No session"}</div>;
}
