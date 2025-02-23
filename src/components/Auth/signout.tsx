"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export const Signout = () => {
    return (
        <Button
            variant="destructive"
            onClick={async () => {
                await signOut();
                redirect("/login");
            }}
        >
            Sign out
        </Button>
    );
};
