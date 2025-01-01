// app/(dashboard)/lesson-planner/page.tsx
import { cookies } from 'next/headers'
import { Metadata } from "next"
import { generateUUID } from '@/lib/utils'
import { LessonPlannerComponent } from "@/components/lesson-planner"
import { DataStreamHandler } from '@/components/data-stream-handler'

export const metadata: Metadata = {
  title: "Lesson Planner",
  description: "Create and manage your lesson plans with AI assistance",
}

export default async function LessonPlannerPage() {
  const id = generateUUID()
  
  // Get any stored preferences from cookies
  const cookieStore = await cookies()
  const departmentFromCookie = cookieStore.get('department')?.value

  return (
    <div className="flex-1 flex flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lesson Planner</h2>
          <p className="text-muted-foreground">
            Create and manage your lesson plans efficiently
          </p>
        </div>
      </div>
      <LessonPlannerComponent 
        key={id}
        id={id}
        initialDepartment={departmentFromCookie}
        selectedVisibilityType="private"
        isReadonly={false}
      />
      <DataStreamHandler id={id} />
    </div>
  )
}