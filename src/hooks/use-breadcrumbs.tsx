"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type BreadcrumbItem = {
    title: string;
    link: string;
};

const routeMapping: Record<string, BreadcrumbItem[]> = {
    "/dashboard": [{ title: "Dashboard", link: "/dashboard" }],
    "/dashboard/teams": [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Teams", link: "/dashboard/teams" },
    ],
};

export function useBreadcrumbs() {
    const pathname = usePathname();

    const breadcrums = useMemo(() => {
        if (routeMapping[pathname]) {
            return routeMapping[pathname];
        }

        const segments = pathname.split("/").filter(Boolean);

        return segments.map((segment, index) => {
            const path = `/${segments.slice(0, index + 1).join("/")}`;
            return {
                title: segment.charAt(0).toUpperCase() + segment.slice(1),
                link: path,
            };
        });
    }, [pathname]);

    return breadcrums;
}
