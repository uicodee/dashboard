import {Box} from "lucide-react";
import {TooltipProvider} from "@/shared/ui/tooltip";
import {Button} from "@/shared/ui/button";
import {Menu} from "./menu";
import {ThemeToggle} from "@/widgets/theme-toggle";
import {bottomMenuItems, topMenuItems} from "@/shared/lib/menu-items";

export const Aside = () => {
    return (
        <TooltipProvider delayDuration={0}>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <div className="border-b p-2">
                    <Button variant="outline" size="icon" aria-label="Home">
                        <Box className="size-5" strokeWidth={1.75}/>
                    </Button>
                </div>
                <nav className="grid gap-1 p-2">
                    <Menu items={topMenuItems}/>
                </nav>
                <nav className="mt-auto grid gap-1 p-2">
                    <ThemeToggle/>
                    <Menu items={bottomMenuItems}/>
                </nav>
            </aside>
        </TooltipProvider>
    );
}