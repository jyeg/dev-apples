import { z } from 'zod';
import { ProductLine } from '@/lib/types';

export type AddProjectFormState = {
  errors?: {
    [key in keyof z.infer<typeof addProjectFormSchema>]?: string[];
  };
  message?: string;
  projectCode?: string;
};
export const CODE_REGEX = /^[A-Z]{3}-\d{3}$/;

const booleanSchema = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (['1', 'true'].includes(val.toLowerCase())) return true;
    if (['0', 'false'].includes(val.toLowerCase())) return false;
  }
  return val;
}, z.coerce.boolean());

export const notificationPreferencesSchema = z.object({
  allNotifications: booleanSchema.optional(),
  dailyDigest: booleanSchema.optional(),
  weeklyDigest: booleanSchema.optional(),
});

export const addProjectFormSchema = z.object({
  projectCode: z
    .string({
      required_error: 'Project code is required',
    })
    .min(7, 'Project code must be in the format AAA-123')
    .regex(CODE_REGEX, 'Invalid project code format'),
  projectDescription: z
    .string({
      required_error: 'Project description is required',
    })
    .min(1, 'Project description is required'),
  productLine: z.nativeEnum(ProductLine, {
    required_error: 'Product line is required',
    invalid_type_error: 'Please select a valid product line',
  }),
  wantNotifications: booleanSchema,
  notificationPreferences: notificationPreferencesSchema.optional(),
});
