import { LoginForm } from "@/components/Auth/Login/loginForm";

export default function LoginPage() {
    return (
        <div className="grid gap-10">

            <div className="text-center">
                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    <span className="text-primary-100">Log in</span> to Code Leveling_
                </h3>
                <p className="text-xl text-muted-foreground">
                    Learn Trough Lesson, Competition and  Training
                </p>
            </div>

            <LoginForm />
        </div>
    )
}