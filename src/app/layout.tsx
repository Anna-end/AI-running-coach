import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Running coach',
  description: 'Create your account and start your running journey',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

