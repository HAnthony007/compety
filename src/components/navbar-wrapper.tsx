"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./layout/dashboard/Navbar";

export default function NavBarWrapper() {
    const pathname = usePathname();
    return <>{pathname.includes("/dashboard") ? null : <Navbar />}</>;
}
