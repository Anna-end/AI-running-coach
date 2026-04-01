import { redirect } from "next/navigation";

export default function RootPage() {
  // потом здесь будет проверка сессии Supabase
  // если залогинен → /dashboard
  // если нет → /login
  
  // пока просто редиректим на dashboard
  redirect("/login");
}