"use client"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { RegisterFormData, RegisterSchema } from "@/lib/validations/registerForm";
import {Label} from "@/components/ui/label";
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import {EmailConfirmPopup} from "@/components/auth/EmailConfirmation"
export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const {error} = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name
        },
      }
    });

    if(error) {
      setError(error.message);
      setLoading(false);
      return
    }

    setOpen(true)
  };

  return ( 
     <>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium uppercase 
        tracking-wider text-muted-foreground">
            Имя
        </Label>
        <Input 
          id="name"
          type="text"
          placeholder="Введите имя"
          {...form.register("name")}
          className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
          required
          >
        </Input>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Email 
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...form.register("email")}
          className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium uppercase 
        tracking-wider text-muted-foreground">
          Пароль
        </Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Придумайте пароль"
          {...form.register("password")}
          className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary pr-12"
          required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          {form.formState.errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

        <div className="space-y-2">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Повторите пароль"
          {...form.register("confirmPassword")}
          className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary pr-12"
          required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          {form.formState.errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider text-sm group"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Создаем аккаунт...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Зарегестрироваться
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{" "}
        <a href="/login" className="text-foreground underline underline-offset-4 hover:text-accent transition-colors">
          Войти
        </a>
      </p>
    </form> 
    <EmailConfirmPopup open={open} onOpen={setOpen}></EmailConfirmPopup>
   </>
  )
}