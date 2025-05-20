import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="w-full h-16 p-5 flex items-center">  
      <h3>Logged in as: {session?.user?.name}</h3>
      <p>Role: {session?.user?.role}</p>
    </div>
  )
}