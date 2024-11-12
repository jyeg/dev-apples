'use server';

import { revalidatePath } from 'next/cache';
import { AddProjectFormState, addProjectFormSchema } from '@/lib/constants';
import prisma from '@/lib/database'; // Import the Prisma client

export async function submitProjectForm(
  prevState: AddProjectFormState,
  formData: FormData,
): Promise<AddProjectFormState> {
  const validatedFields = addProjectFormSchema.safeParse({
    projectCode: formData.get('projectCode'),
    projectDescription: formData.get('projectDescription'),
    productLine: formData.get('productLine'),
    wantNotifications: formData.get('wantNotifications'),
    notificationPreferences: {
      allNotifications: formData.get(
        'notificationPreferences.allNotifications',
      ),
      dailyDigest: formData.get('notificationPreferences.dailyDigest'),
      weeklyDigest: formData.get('notificationPreferences.weeklyDigest'),
    },
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to submit form. Please check the errors above.',
    };
  }

  try {
    // Check if project code already exists
    const existingProject = await prisma.project.findUnique({
      where: { projectCode: validatedFields.data.projectCode },
    });

    if (existingProject) {
      return {
        errors: {
          projectCode: ['Project code already exists'],
        },
        message: 'Failed to submit form. Project code must be unique.',
      };
    }

    // Create new project
    const project = await prisma.project.create({
      data: {
        projectCode: validatedFields.data.projectCode.toUpperCase(),
        projectDescription: validatedFields.data.projectDescription,
        productLine: validatedFields.data.productLine,
        isSubscribed: validatedFields.data.wantNotifications,
        allNotifications: validatedFields.data.wantNotifications
          ? validatedFields.data.notificationPreferences?.allNotifications
          : false,
        dailyDigest: validatedFields.data.wantNotifications
          ? validatedFields.data.notificationPreferences?.dailyDigest
          : false,
        weeklyDigest: validatedFields.data.wantNotifications
          ? validatedFields.data.notificationPreferences?.weeklyDigest
          : false,
      },
    });

    revalidatePath('/');

    return {
      message: 'Form submitted successfully!',
      projectCode: project.projectCode,
    };
  } catch (error) {
    console.error('Failed to save project:', error);
    return {
      message: 'Failed to save project. Please try again.',
    };
  }
}
