'use client'

import Link from "next/link";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { loginAction } from "./login.action";
import { loginFormSchemas, loginSchemaType } from "./loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation";

export function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<loginSchemaType>({
        resolver: zodResolver(loginFormSchemas),
        mode: "onBlur",
    });

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: loginSchemaType) => {
        setIsSubmitting(true)

        toast.promise(
            loginAction(data),
            {
                loading: "Logging in...",
                success: (result) => {
                    setIsSubmitting(false)
                    reset();
                    if (result.successMessage) {
                        return result.successMessage
                    }
                    return "Logged in successfully!"
                },
                error: (result) => {
                    setIsSubmitting(false)
                    if (result.errors) {
                        return Object.values(result.errors).join(", ");
                    }
                    return result.errorMessage || "Login failed";
                }
            }
        )
    }

    return (
        <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div>
                    <label htmlFor="email"
                           className={errors.email ? "text-red-500 text-muted-foreground" : "text-muted-foreground"}
                    >
                        Email
                    </label>
                    <Input
                        type="email"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="code@level.com"
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm">{errors.email.message}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="password"
                           className={errors.password ? "text-red-500 text-muted-foreground" : "text-muted-foreground"}
                    >
                        Password
                    </label>
                    <Input
                        type="password"
                        {...register("password")}
                        placeholder="Your password"
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm">{errors.password.message}</div>
                    )}
                    <div className="text-right text-sm text-muted-foreground underline">
                        <Link href="#">Forgot password</Link>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col gap-3'}>
                <div>
                    {
                        isSubmitting ? (
                            <Button size={'lg'} disabled
                                    className="w-full text-sm font-semibold"
                            >
                                <Loader2 className="animate-spin"/>
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                size={"lg"}
                                type="submit"
                                className="w-full text-sm font-semibold"
                            >
                                Log in
                            </Button>
                        )
                    }

                </div>
                <div className="text-sm font-medium leading-none">
                    Don't have an account? <Link href="/register" className="underline">Register</Link>
                </div>
            </div>
        </form>
    )
}