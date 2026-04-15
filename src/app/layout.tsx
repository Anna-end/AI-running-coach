import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {QueryProvider} from "@/providers/QueryProvide"
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});
export const metadata: Metadata = {
  title: 'AI Running coach',
  description: 'Create your account and start your running journey',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
        {children}
        </QueryProvider>
      </body>
    </html>
  )
}

