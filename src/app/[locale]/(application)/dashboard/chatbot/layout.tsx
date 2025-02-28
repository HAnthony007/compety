import PageContainer from "@/components/layout/dashboard/page-container";

export default function ChatBotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <PageContainer scrollable={false}>{children}</PageContainer>;
}
