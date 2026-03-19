import { PlanForm } from "@/components/ui/plan-form"

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-3">
            Создай свой <span className="text-accent">план</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ответь на несколько вопросов, и мы составим персональный план тренировок специально для тебя
          </p>
        </div>

        {/* Form */}
        <PlanForm />
      </div>
    </div>
  )
}