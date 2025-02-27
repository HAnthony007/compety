"use client";
import ThemeProvider from "@/components/layout/theme-provider";
import { I18nProviderClient } from "@/locales/client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import React from "react";

interface ProvidersProps {
    locale: string;
    session: SessionProviderProps["session"];
    children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({
    locale,
    session,
    children,
}) => {
    return (
        <I18nProviderClient locale={locale}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <SessionProvider session={session}>{children}</SessionProvider>
            </ThemeProvider>
        </I18nProviderClient>
    );
};
