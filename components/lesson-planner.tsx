// components/lesson-planner.tsx
'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LessonPlanSchema = z.object({
  evaluatorName: z.string().nonempty('Evaluator name is required'),
  department: z.string().nonempty('Department is required'),
  subject: z.string().nonempty('Subject is required'),
  year: z.string().nonempty('Year is required'),
  week: z.string().nonempty('Week is required'),
  objectives: z.string().nonempty('Objectives are required'),
  activities: z.string().nonempty('Activities are required'),
  materials: z.string().nonempty('Materials are required'),
  assessment: z.string().nonempty('Assessment is required'),
});

type LessonPlanFormValues = z.infer<typeof LessonPlanSchema>;

export function LessonPlannerComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LessonPlanFormValues>({
    resolver: zodResolver(LessonPlanSchema),
  });

  const onSubmit = async (data: LessonPlanFormValues) => {
    setIsSaving(true);
    try {
      // Handle form submission
      console.log(data);
      if (file) {
        // Handle file upload
        console.log(file);
      }
    } catch (error) {
      console.error('Failed to save lesson plan:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Basic Information</CardTitle>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Evaluator Name</label>
              <input {...register('evaluatorName')} />
              {errors.evaluatorName && <p>{errors.evaluatorName.message}</p>}
            </div>
            <div>
              <label>Department</label>
              <input {...register('department')} />
              {errors.department && <p>{errors.department.message}</p>}
            </div>
            <div>
              <label>Subject</label>
              <input {...register('subject')} />
              {errors.subject && <p>{errors.subject.message}</p>}
            </div>
            <div>
              <label>Year</label>
              <input {...register('year')} />
              {errors.year && <p>{errors.year.message}</p>}
            </div>
            <div>
              <label>Week</label>
              <input {...register('week')} />
              {errors.week && <p>{errors.week.message}</p>}
            </div>
            <div>
              <label>Objectives</label>
              <textarea {...register('objectives')} />
              {errors.objectives && <p>{errors.objectives.message}</p>}
            </div>
            <div>
              <label>Activities</label>
              <textarea {...register('activities')} />
              {errors.activities && <p>{errors.activities.message}</p>}
            </div>
            <div>
              <label>Materials</label>
              <textarea {...register('materials')} />
              {errors.materials && <p>{errors.materials.message}</p>}
            </div>
            <div>
              <label>Assessment</label>
              <textarea {...register('assessment')} />
              {errors.assessment && <p>{errors.assessment.message}</p>}
            </div>
            <div>
              <label>Upload File</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}