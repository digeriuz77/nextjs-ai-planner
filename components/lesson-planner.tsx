// components/lesson-planner.tsx
'use client'

import React, { useState } from 'react';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
  const [formData, setFormData] = useState<LessonPlanFormValues>({
    evaluatorName: '',
    department: '',
    subject: '',
    year: '',
    week: '',
    objectives: '',
    activities: '',
    materials: '',
    assessment: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LessonPlanFormValues, string>>>({});

  const validateForm = () => {
    try {
      LessonPlanSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: typeof errors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LessonPlanFormValues] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      // Handle form submission
      console.log(formData);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
            <CardTitle>Lesson Plan Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="evaluatorName">Evaluator Name</Label>
                <Input
                  id="evaluatorName"
                  name="evaluatorName"
                  value={formData.evaluatorName}
                  onChange={handleChange}
                  className={errors.evaluatorName ? "border-red-500" : ""}
                />
                {errors.evaluatorName && (
                  <p className="text-sm text-red-500">{errors.evaluatorName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={errors.department ? "border-red-500" : ""}
                />
                {errors.department && (
                  <p className="text-sm text-red-500">{errors.department}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && (
                  <p className="text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={errors.year ? "border-red-500" : ""}
                />
                {errors.year && (
                  <p className="text-sm text-red-500">{errors.year}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="week">Week</Label>
                <Input
                  id="week"
                  name="week"
                  value={formData.week}
                  onChange={handleChange}
                  className={errors.week ? "border-red-500" : ""}
                />
                {errors.week && (
                  <p className="text-sm text-red-500">{errors.week}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objectives">Objectives</Label>
                <Textarea
                  id="objectives"
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  className={errors.objectives ? "border-red-500" : ""}
                  rows={4}
                />
                {errors.objectives && (
                  <p className="text-sm text-red-500">{errors.objectives}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="activities">Activities</Label>
                <Textarea
                  id="activities"
                  name="activities"
                  value={formData.activities}
                  onChange={handleChange}
                  className={errors.activities ? "border-red-500" : ""}
                  rows={4}
                />
                {errors.activities && (
                  <p className="text-sm text-red-500">{errors.activities}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="materials">Materials</Label>
                <Textarea
                  id="materials"
                  name="materials"
                  value={formData.materials}
                  onChange={handleChange}
                  className={errors.materials ? "border-red-500" : ""}
                  rows={4}
                />
                {errors.materials && (
                  <p className="text-sm text-red-500">{errors.materials}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="assessment">Assessment</Label>
                <Textarea
                  id="assessment"
                  name="assessment"
                  value={formData.assessment}
                  onChange={handleChange}
                  className={errors.assessment ? "border-red-500" : ""}
                  rows={4}
                />
                {errors.assessment && (
                  <p className="text-sm text-red-500">{errors.assessment}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? 'Saving...' : 'Save Lesson Plan'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}