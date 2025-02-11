import { RegisterForm } from "@/components/Auth/Signup/signupForm";

export default function LoginPage() {
    return (
        <div className="grid gap-10">

            <div className="text-center">
                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    <span className="text-[#3284D1]">Join</span> to Code Leveling_
                </h3>
                <p className="text-xl text-muted-foreground">
                    Create your leveling account to discover all of its features
                </p>
            </div>

            <RegisterForm />
        </div>
    )
}