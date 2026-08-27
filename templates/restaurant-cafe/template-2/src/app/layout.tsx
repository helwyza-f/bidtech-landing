import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Deny Restaurant | Better Food for More People',
  description: 'Deny Restaurant - Artisan Kitchen, Wood-Fired Pizza & Craft Bistro',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(bricolage.variable, dmSans.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('theme');
                if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (saved === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans bg-background text-foreground" suppressHydrationWarning>{children}</body>
    </html>
  )
}
