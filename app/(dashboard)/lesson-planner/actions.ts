// app/(dashboard)/lesson-planner/actions.ts
'use server'

import { auth } from '@/app/(auth)/auth'
import { createLessonPlan, updateLessonPlan, getLessonPlanById } from '@/lib/db/queries'
import { revalidatePath } from 'next/cache'

export async function createNewLessonPlan(data: {
  evaluatorName: string
  department: string
  subject: string
  year: string
  week: string
  objectives: string
  activities: string
  materials: string
  assessment: string
}) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  try {
    const lessonPlan = await createLessonPlan({
      userId: session.user.id,
      ...data
    })

    revalidatePath('/lesson-planner')
    return lessonPlan
  } catch (error) {
    console.error('Error creating lesson plan:', error)
    throw new Error('Failed to create lesson plan')
  }
}

export async function updateExistingLessonPlan(
  id: string,
  data: Partial<{
    evaluatorName: string
    department: string
    subject: string
    year: string
    week: string
    objectives: string
    activities: string
    materials: string
    assessment: string
  }>
) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  try {
    const lessonPlan = await updateLessonPlan({
      id,
      userId: session.user.id,
      ...data
    })

    revalidatePath(`/lesson-planner/${id}`)
    return lessonPlan
  } catch (error) {
    console.error('Error updating lesson plan:', error)
    throw new Error('Failed to update lesson plan')
  }
}

export async function getLessonPlan(id: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  try {
    const lessonPlan = await getLessonPlanById({
      id,
      userId: session.user.id
    })

    if (!lessonPlan) {
      throw new Error('Lesson plan not found')
    }

    return lessonPlan
  } catch (error) {
    console.error('Error fetching lesson plan:', error)
    throw new Error('Failed to fetch lesson plan')
  }
}