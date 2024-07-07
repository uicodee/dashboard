"use client"

import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/ui/tooltip";
import {Button} from "@/shared/ui/button";
import {ReactNode} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/shared/ui/utils";

interface Item {
    title: string;
    link: string;
    icon: ReactNode
}

interface MenuProps {
    items: Item[];
}

export const Menu = ({items}: MenuProps) => {
    const pathname = usePathname()

    return (
        <>
            {items.map(item => (
                <Tooltip key={item.title}>
                    <Link href={item.link}>
                        <TooltipTrigger asChild>
                            <Button
                                variant={item.link === pathname ? "default" : "ghost"}
                                size="icon"
                                className={cn("rounded-lg")}
                                aria-label={item.title}
                            >
                                {item.icon}
                            </Button>
                        </TooltipTrigger>
                    </Link>
                    <TooltipContent side="right" sideOffset={5}>
                        {item.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </>
    )
}