import { LoginForm } from "@/components/Auth/Login/loginForm";
import { getI18n } from "@/locales/server";

export default async function LoginPage() {
    const t = await getI18n();
    return (
        <div className="grid gap-10">

            <div className="text-center">
                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    <span className="text-primary-100">{t("auth.loginForm.title")}</span> {t("to")} Compety
                </h3>
                <p className="text-xl text-muted-foreground">
                    {t("auth.loginForm.subTitle")}
                </p>
            </div>

            <LoginForm />
        </div>
    )
}