"use client"

import {ReactNode} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

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
            {items.map((item, index) => (
                <Link
                    key={index}
                    href={item.link}
                    className={`flex items-center gap-4 px-2.5 text-sm hover:text-foreground ${pathname === item.link ? 'text-primary' : 'text-muted-foreground'}`}
                >
                    {item.icon}
                    {item.title}
                </Link>
            ))}
        </>
    )
}