export default function RegisterLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid place-items-center h-screen ">
            <div className="max-w-md w-full">
                {children}
            </div>
        </div>
    )
}