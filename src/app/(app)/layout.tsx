import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../components/ui/sidebar"
import { DashboardSidebar } from "../../components/layout/Sidebar"
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}