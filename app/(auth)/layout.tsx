export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      {children}
    </div>
  );
}