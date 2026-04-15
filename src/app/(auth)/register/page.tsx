import { RegisterForm } from "@/components/auth/RegisterForm"
import Image from "next/image"
import runnerImage from '@/public/images/image.png'; 
export default function RegisterFormRegisterPage() {
return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative">
        <Image
          src={runnerImage}
          alt="Runner in motion"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Motivational Text Overlay */}
        <div className="absolute bottom-16 left-12 max-w-md">
          <h2 className="text-5xl xl:text-6xl font-bold text-foreground leading-tight tracking-tight">
            RUN YOUR
            <br />
            <span className="text-accent">FASTEST</span>
            <br />
            MILE YET.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Присоединяйтесь к миллионам бегунов, которые следят за своим прогрессом, соревнуются с 
            друзьями и каждый день выходят за пределы своих возможностей.
          </p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center px-8 md:px-16 lg:px-12 xl:px-20 py-12">
        <div className="max-w-md mx-auto w-full">
 
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Создай свой аккаунт
            </h1>
            <p className="mt-3 text-muted-foreground">
              Бегай с нами. Следи за своими показателями. Бей свои рекорды.
            </p>
          </div>

          {/* Registration Form */}
          <RegisterForm />

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground uppercase tracking-wider">
              <a href="#" className="hover:text-foreground transition-colors">Help</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero Background */}
      <div className="lg:hidden fixed inset-0 -z-10">
        <Image
          src="/images/runner-hero.jpg"
          alt="Runner in motion"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>
    </div>
  )
}