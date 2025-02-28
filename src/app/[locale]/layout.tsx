import NavBarWrapper from "@/components/navbar-wrapper";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "../globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Compety",
    description:
        "Bienvenue dans notre projet de préparation pour EMIHACK 3.0 ! Ce hackathon technologique est l'opportunité parfaite pour repousser les limites de l'innovation. Nous combinons authentification avancée, communication en temps réel et intelligence artificielle pour créer une expérience utilisateur immersive en 3D et interactive.",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: {
        locale: string;
    };
}>) {
    const resolvedParams = await params;
    const session = await auth();
    return (
        <html lang={resolvedParams.locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextTopLoader showSpinner={false} />
                <Providers session={session} locale={resolvedParams.locale}>
                    <NavBarWrapper />
                    <Toaster position="bottom-right" richColors closeButton />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
