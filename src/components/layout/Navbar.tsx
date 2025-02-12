import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ToggleLangage } from "./ToogleLangage"

export const Navbar = () => {
    return (
        <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                Compety
            </nav>
            <div>
                <div className="flex items-center justify-center flex-1 space-x-5">
                    <ToggleLangage />
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}