import { Signout } from "@/components/Auth/signout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) return redirect("/login");
    return (
        <>
            <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
                <p className="text-gray-600">Signed in as: </p>
                <p className="font-medium">{session.user?.email}</p>
            </div>
            <div className="flex justify-center">
                <Signout />
            </div>
        </>
    );
}
