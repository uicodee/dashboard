import { AuthProvider } from "@/shared/providers/auth-provider";
import "../globals.css";
import { Aside } from "@/widgets/aside";
import { Header } from "@/widgets/header/ui/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex-grow bg-muted/40 min-h-full  md:h-full">
        <Aside />
        <div className="flex-grow h-full sm:gap-4 sm:pl-14">
          <Header />
          <div className="flex-grow h-full w-full p-3 ">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
}
