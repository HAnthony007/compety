"use client";
import { navItems } from "@/constants/data";
import {
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarProvider,
    KBarSearch,
} from "kbar";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import RenderResults from "./render-result";
import useThemeSwitching from "./use-theme-switching";

export const Kbar = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const navigaTo = (url: string) => {
        router.push(url);
    };

    const action = useMemo(
        () =>
            navItems.flatMap((navItem) => {
                const baseAction =
                    navItem.url !== "#"
                        ? {
                              id: `${navItem.title.toLowerCase()}Action`,
                              name: navItem.title,
                              shortcut: navItem.shortcut,
                              keywords: navItem.title.toLowerCase(),
                              section: "Navigation",
                              subtitle: `Go to ${navItem.title}`,
                              perform: () => navigaTo(navItem.url),
                          }
                        : null;

                const childAction =
                    navItem.items?.map((childItem) => ({
                        id: `${childItem.title.toLowerCase()}Action`,
                        name: childItem.title,
                        shortcut: childItem.shortcut,
                        keywords: childItem.title.toLowerCase(),
                        section: "Navigation",
                        subtitle: `Go to ${childItem.title}`,
                        perform: () => navigaTo(childItem.url),
                    })) ?? [];

                return baseAction ? [baseAction, ...childAction] : childAction;
            }),
        []
    );

    return (
        <KBarProvider actions={action}>
            <KbarComponent>{children}</KbarComponent>
        </KBarProvider>
    );
};

const KbarComponent = ({ children }: { children: React.ReactNode }) => {
    useThemeSwitching();
    return (
        <>
            <KBarPortal>
                <KBarPositioner className="fixed inset-0 z-[99999] bg-black-80 !p-0 backdrop-blur-sm">
                    <KBarAnimator className="relative !mt-4 w-full max-w-[600px] !-translate-y-12 overflow-hidden rounded-lg border bg-background text-foreground shadow-lg">
                        <div className="bg-background">
                            <div className="border-x-0 border-b-2">
                                <KBarSearch className="w-full border-none bg-background px-6 py-4 text-lg outline-none focus:outline-none focus:ring-0 focus:ring-offset-0" />
                            </div>
                            <RenderResults />
                        </div>
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </>
    );
};
