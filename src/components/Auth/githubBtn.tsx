"use client";
import { GithubIcon } from "@/components/icon/iconApp";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { githubAction } from "./Login/login.action";

export const GithubSign = () => {
    const [, action, pending] = useActionState(githubAction, undefined);
    return (
        <form action={action}>
            {pending ? (
                <Button disabled variant="outline" className="w-full text-sm">
                    <Loader2 />
                    <GithubIcon />
                    Login with GitHub
                </Button>
            ) : (
                <Button variant="outline" className="w-full text-sm">
                    <GithubIcon />
                    Login with GitHub
                </Button>
            )}
        </form>
    );
};
