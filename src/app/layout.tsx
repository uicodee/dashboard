import type {Metadata} from "next";
import { Onest as OnestFont } from 'next/font/google'

import "./globals.css";
import {cn} from "@/shared/ui/utils";
import {ReactQueryClientProvider, ThemeProvider} from "@/shared/providers";

const Onest = OnestFont({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
    title: {template: "%s | Joblance", default: "Admin | Joblance"},
    description: "Taxopark INC",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <ReactQueryClientProvider>
            <html lang="en" className="h-full w-full" style={{scrollbarGutter: "stable"}} suppressHydrationWarning>
            <body className={cn(Onest.className, "h-full w-full")}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange={false}
            >
                {/*<AuthProvider>*/}
                {children}
                {/*</AuthProvider>*/}
            </ThemeProvider>
            </body>
            </html>
        </ReactQueryClientProvider>
    );
}
