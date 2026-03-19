interface PlanPageProps {
  params: { id: string };
}

export default function PlanPage({ params }: PlanPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">План #{params.id}</h1>
      <p className="text-muted-foreground">
        Детали плана появятся после подключения Supabase
      </p>
    </div>
  );
}