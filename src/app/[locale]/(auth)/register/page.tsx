import { RegisterForm } from "@/components/Auth/Signup/signupForm";
import { getI18n } from "@/locales/server";

export default async function LoginPage() {
    const t = await getI18n();
    return (
        <div className="grid gap-10">

            <div className="text-center">
                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    <span className="text-[#3284D1]">{t("auth.registerForm.title")}</span> {t("to")} Compety
                </h3>
                <p className="text-xl text-muted-foreground">
                    {t("auth.registerForm.subTitle")}
                </p>
            </div>

            <RegisterForm />
        </div>
    )
}