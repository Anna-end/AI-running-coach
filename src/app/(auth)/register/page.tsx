import { RegisterForm } from "@/components/auth/RegisterForm"
export default function RegisterFormRegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-2">Создай аккаунт</h1>
        <p className="text-muted-foreground">
          <RegisterForm />
        </p>
      </div>
    </div>
  );
}