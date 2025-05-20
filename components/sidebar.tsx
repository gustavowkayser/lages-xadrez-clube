'use client'

import Image from "next/image";
import logo from "@/public/logo.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Handshake, House, Info, Medal, Newspaper, Phone, Trophy } from "lucide-react";

export default function Sidebar() {
  const path = usePathname();

  const links = [
    { name: "Home", href: "/", icon: House },
    { name: "Sócios", href: "/socios", icon: Handshake },
    { name: "Notícias", href: "/noticias", icon: Newspaper },
    { name: "Torneios", href: "/torneios", icon: Trophy },
    { name: "Contato", href: "/contato", icon: Phone },
    { name: "Sobre", href: "/sobre", icon: Info },
  ];

  return (
    <div className="w-72 h-screen p-2 sticky top-0 left-0">
      <a
        className="flex flex-row justify-center items-center gap-2 mt-4 mb-10 cursor-pointer"
        href="/"
      >
        <Image src={logo} alt="Logo" width={40} height={40} />
        <h1 className="font-bold text-lg">Lages Xadrez Clube</h1>
      </a>
      <div>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={cn("flex flex-row items-center gap-2 p-2 rounded-md hover:bg-gray-200 transition-colors", link.href === path ? "bg-gray-200" : "")}
          >
            <link.icon />
            <span className="text-lg font-semibold">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
