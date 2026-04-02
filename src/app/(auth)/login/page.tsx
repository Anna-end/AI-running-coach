import { LoginForm } from "@/components/auth/LoginForm";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-2">Вход</h1>
         <LoginForm />
      </div>
    </div>
  );
}