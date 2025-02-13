'use client'

import Link from "next/link";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation";
import { registerFormSchemas, registerSchemaType } from "./signupSchema";
import { registerAction } from "./signup.action";
import { useScopedI18n } from "@/locales/client";

export function RegisterForm() {
    const router = useRouter();
    const t = useScopedI18n("auth.registerForm");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<registerSchemaType>({
        resolver: zodResolver(registerFormSchemas),
        mode: "onBlur",
    });

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: registerSchemaType) => {
        setIsSubmitting(true)

        toast.promise(
            registerAction(data),
            {
                loading: "Register in...",
                success: (result) => {
                    setIsSubmitting(false)
                    reset();
                    if (result.successMessage) {
                        router.push('/login');
                        return result.successMessage
                    }
                    return "Register successfully!"
                },
                error: (result) => {
                    setIsSubmitting(false)
                    if (result.errors) {
                        return Object.values(result.errors).join(", ");
                    }
                    return result.errorMessage || "Failed register";
                }
            }
        )
    }

    return (
        <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div>
                    <label htmlFor="pseudo"
                        className={errors.pseudo ? "text-red-500 text-muted-foreground" : "text-muted-foreground"}
                    >
                        {t("pseudo")}
                    </label>
                    <Input
                        {...register("pseudo")}
                        className={errors.pseudo ? "border-red-500" : ""}
                        placeholder={t("pseudoPlaceholder")}
                    />
                    {errors.pseudo && (
                        <div className="text-red-500 text-sm">{errors.pseudo.message}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="email"
                        className={errors.email ? "text-red-500 text-muted-foreground" : "text-muted-foreground"}
                    >
                        {t("email")}
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
                        {t("password")}
                    </label>
                    <Input
                        type="password"
                        {...register("password")}
                        placeholder={t("passwordPlaceholder")}
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm">{errors.password.message}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword"
                        className={errors.confirmPassword ? "text-red-500 text-muted-foreground" : "text-muted-foreground"}
                    >
                        {t("confirmPassword")}
                    </label>
                    <Input
                        type="password"
                        {...register("confirmPassword")}
                        placeholder={t("confirmPasswordPlaceholder")}
                    />
                    {errors.confirmPassword && (
                        <div className="text-red-500 text-sm">{errors.confirmPassword.message}</div>
                    )}
                </div>
            </div>
            <div className={'flex flex-col gap-4'}>
                <div>
                    {
                        isSubmitting ? (
                            <Button size={'lg'} disabled
                                className="w-full text-sm font-semibold"
                            >
                                <Loader2 className="animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button size={'lg'}
                                type="submit"
                                className="w-full text-sm font-semibold"
                            >
                                {t("register")}
                            </Button>
                        )
                    }

                </div>
                <div className="text-sm font-medium leading-none">
                    {t("haveAccount")} <Link href="/login" className="underline">{t("login")}</Link>
                </div>
            </div>
        </form>
    )
}