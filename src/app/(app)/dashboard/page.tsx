import Link from 'next/link'
import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getActivePlan } from "@/lib/db/plans";
import { cookies } from "next/headers";
import { Plan } from "@/components/plan/PlanStats"

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
;

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const plan = await getActivePlan(user.id)
  console.log(plan);

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            Привет, {profile?.name ?? user.email}! 👋
          </h1>
          <p className="text-muted-foreground">
            У тебя пока нет плана тренировок
          </p>
        </div>
        <Link
          href="/plan/new"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
        >
          Создать план с AI
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Plan weekPlan={plan.training_weeks}/>
    </div>
  );
}
