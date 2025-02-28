import { Signout } from "@/components/Auth/signout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) return redirect("/login");
    return (
        <>
            <div className="rounded-lg p-4 text-center mb-6">
                <p className="">Signed in as: </p>
                <p className="">{session.user?.email}</p>
            </div>
            <div className="flex justify-center">
                <Signout />
            </div>
        </>
    );
}
