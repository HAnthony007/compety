"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScopedI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginAction } from "./login.action";
import { loginFormSchemas, loginSchemaType } from "./loginSchema";

export function LoginForm() {
    const t = useScopedI18n("auth.loginForm");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<loginSchemaType>({
        resolver: zodResolver(loginFormSchemas),
        mode: "onBlur",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: loginSchemaType) => {
        setIsSubmitting(true);

        toast.promise(loginAction(data), {
            loading: "Logging in...",
            success: (result) => {
                setIsSubmitting(false);
                reset();
                if (result.successMessage) {
                    return result.successMessage;
                }
                return "Logged in successfully!";
            },
            error: (result) => {
                setIsSubmitting(false);
                if (result.errors) {
                    return Object.values(result.errors).join(", ");
                }
                return result.errorMessage || "Login failed";
            },
        });
    };

    return (
        <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div>
                    <label
                        htmlFor="email"
                        className={
                            errors.email
                                ? "text-red-500 text-muted-foreground"
                                : "text-muted-foreground"
                        }
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
                        <div className="text-red-500 text-sm">
                            {errors.email.message}
                        </div>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className={
                            errors.password
                                ? "text-red-500 text-muted-foreground"
                                : "text-muted-foreground"
                        }
                    >
                        {t("password")}
                    </label>
                    <Input
                        type="password"
                        {...register("password")}
                        placeholder={t("passwordPlaceholder")}
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm">
                            {errors.password.message}
                        </div>
                    )}
                    <div className="text-right text-sm text-muted-foreground underline">
                        <Link href="#">{t("forgotPassword")}</Link>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col gap-3"}>
                <div>
                    {isSubmitting ? (
                        <Button
                            size={"lg"}
                            disabled
                            className="w-full text-sm font-semibold"
                        >
                            <Loader2 className="animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button
                            size={"lg"}
                            type="submit"
                            className="w-full text-sm font-semibold"
                        >
                            {t("title")}
                        </Button>
                    )}
                </div>
                <div className="text-sm font-medium leading-none">
                    {t("createAccount")}{" "}
                    <Link href="/register" className="underline">
                        {t("register")}
                    </Link>
                </div>
            </div>
        </form>
    );
}
