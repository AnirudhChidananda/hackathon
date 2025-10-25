import DashNav from "@/components/DashNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <DashNav /> */}
      {children}
    </div>
  );
}
