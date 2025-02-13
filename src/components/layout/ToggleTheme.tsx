'use client'
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from "lucide-react";

export function ToggleTheme() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Button size="sm"
            variant="ghost"
            onClick={() => {
                console.log(resolvedTheme)
                setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            }
        >
            {
                resolvedTheme === "dark" ? <SunIcon className="size-4 text-orange-300"/> : <MoonIcon className="size-4 text-blue-300"/>
            }
            <span className="sr-only">Toggle Theme</span>
        </Button>
    )
}