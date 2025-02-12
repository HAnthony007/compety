'use client';
import { I18nProviderClient } from "@/locales/client";
import { PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProviders, useTheme } from 'next-themes';

export const Providers = (props: PropsWithChildren<{ locale: string }>) => {
    return (
        <I18nProviderClient locale={props.locale}>
            <NextThemesProviders enableSystem
                attribute='class'
                defaultTheme="system"
                disableTransitionOnChange
            >
                {props.children}
            </NextThemesProviders>
        </I18nProviderClient>
    );
}