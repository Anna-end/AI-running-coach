"use client";
import { SidebarTrigger } from "../../components/ui/sidebar"
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/Button";
export const Header = () => {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
  router.refresh();
};
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <SidebarTrigger className="-ml-2" />
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <Button
          onClick={handleLogout}
          type="button"
          variant="destructive"
          size="sm">
          Выйти
        </Button>
      </div>
    </header> 
  )
}