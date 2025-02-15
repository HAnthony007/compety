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

// Cette fonction gère la capture faciale (à personnaliser selon ton système de reconnaissance)
const handleCaptureFace = async () => {
    // Ton code de capture faciale ici, ex: ouvrir la caméra et capturer l'image
    console.log("Face capture started...");
    // Exemple de code pour une capture réussie, tu peux remplacer par ton propre code
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);  // simuler une capture réussie
        }, 2000);
    });
}

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
    const [isCapturingFace, setIsCapturingFace] = useState(false)

    const onSubmit = async (data: registerSchemaType) => {
        setIsSubmitting(true)

        toast.promise(
            registerAction(data),
            {
                loading: "Registering...",
                success: (result) => {
                    setIsSubmitting(false)
                    reset();
                    if (result.successMessage) {
                        router.push('/login');
                        return result.successMessage
                    }
                    return "Registration successful!"
                },
                error: (result) => {
                    setIsSubmitting(false)
                    if (result.errors) {
                        return Object.values(result.errors).join(", ");
                    }
                    return result.errorMessage || "Registration failed";
                }
            }
        )
    }

    const handleFaceCapture = async () => {
        setIsCapturingFace(true);
        const faceCaptured = await handleCaptureFace();
        setIsCapturingFace(false);

        if (faceCaptured) {
            toast.success("Face captured successfully!");
        } else {
            toast.error("Face capture failed.");
        }
    };

    return (
        <form className="grid gap-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
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
                {/* Ajout du bouton pour capturer la reconnaissance faciale */}
                <div>
                    <Button 
                        type="button" 
                        onClick={handleFaceCapture} 
                        className="w-full text-sm font-semibold"
                        disabled={isCapturingFace}
                    >
                        {isCapturingFace ? <Loader2 className="animate-spin" /> : "Capture Face"}
                    </Button>
                </div>

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
