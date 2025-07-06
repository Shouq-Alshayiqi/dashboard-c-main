import type { Metadata } from 'next'
import './globals.css'
import './fonts.css'

export const metadata: Metadata = {
  title: 'GLA Strategy Dashboard',
  description: 'Dashboard for monitoring mall leasing strategy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-['Neo Sans Arabic']">{children}</body>
    </html>
  )
}
