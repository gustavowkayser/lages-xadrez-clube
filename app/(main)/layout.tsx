import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="border-2 border-b-0 border-gray-100 rounded-lg h-full rounded-b-none p-6 m-6 mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
