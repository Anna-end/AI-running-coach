import Link from 'next/link'
import { Button } from "@/components/ui/Button"
export default function DashboardPage() {
  const hasPlan = false;

  if (!hasPlan) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h2 className="text-2xl font-bold">Начни свой путь 🏃</h2>
        <p className="text-muted-foreground">У тебя пока нет плана тренировок</p>
        <Link href="/plan/new">
          <Button variant="default">Создать план</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* dashboard с планом */}
    </div>
  );
}