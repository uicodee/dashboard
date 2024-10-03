import { Button } from "@/shared/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { bottomMenuItems, topMenuItems } from "@/shared/lib/menu-items";
import { Menu as MenuCreator } from "./menu";

export const Header = () => {
  return (
    <header className="md:hidden sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="sm:hidden">
            <Menu className="h-5 w-5" strokeWidth={1.75} />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <MenuCreator items={topMenuItems} />
            <MenuCreator items={bottomMenuItems} />
          </nav>
        </SheetContent>
      </Sheet>
      <div></div>
    </header>
  );
};
