import { auth } from "@/auth";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="w-full h-16 p-5 flex items-center">  
      <h3>Logged in as: {session?.user?.name}</h3>
      <p>Role: {session?.user?.role}</p>
      <Image src={session?.user?.image || ""} alt="User Image" width={40} height={40} className="rounded-full"/>
    </div>
  )
}