// app/(dashboard)/layout.tsx
import { AppSidebar } from '@/components/app-sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        {children}
      </main>
    </div>
  )
}