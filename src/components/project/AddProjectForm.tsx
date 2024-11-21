'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitProjectForm } from '@/actions/submit';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import SubmitButton from '@/components/project/SubmitButton';
import { NotificationPreferences } from './NotificationPreferences';
import { SuccessMessage } from './SuccessMessage';
import { ProductLine } from '@/lib/types';
import { addProjectFormSchema, AddProjectFormState } from '@/lib/constants';
import { useProjectFormContext } from '@/context/ProjectFormContext';

const initialState = {
  message: undefined,
  errors: undefined,
  projectCode: undefined,
};

const AddProjectForm = () => {
  const { setLastSuccessfulProjectCode } = useProjectFormContext();
  const [serverState, formAction, isPending] = useActionState(
    (prevState: AddProjectFormState, formData: FormData) =>
      submitProjectForm(prevState, formData),
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof addProjectFormSchema>>({
    resolver: zodResolver(addProjectFormSchema),
    defaultValues: {
      projectCode: '',
      projectDescription: '',
      productLine: undefined, // rhf expects specific default values for select fields placeholder to display...pretty annoying honestly.
      wantNotifications: false,
      notificationPreferences: {
        allNotifications: false,
        dailyDigest: false,
        weeklyDigest: false,
      },
    },
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (serverState.errors || !serverState.projectCode) {
      setShowSuccess(false);
    } else if (serverState.projectCode && !serverState.errors) {
      setShowSuccess(true);
      setLastSuccessfulProjectCode(serverState.projectCode);

      // Reset form fields
      form.reset();
    }
  }, [
    serverState.projectCode,
    serverState.errors,
    form,
    setLastSuccessfulProjectCode,
  ]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          className="space-y-8"
          suppressHydrationWarning
        >
          <FormField
            control={form.control}
            name="projectCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project super secret code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="AAA-123"
                    {...field}
                    suppressHydrationWarning
                  />
                </FormControl>
                {serverState.errors?.projectCode && (
                  <FormMessage>{serverState.errors.projectCode[0]}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter project description"
                    suppressHydrationWarning
                    {...field}
                  />
                </FormControl>
                {serverState.errors?.projectDescription && (
                  <FormMessage>
                    {serverState.errors.projectDescription[0]}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product line</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  // @ts-expect-error - react rc and reacthookform cause some console warnings with nextjs
                  suppressHydrationWarning
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product line" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ProductLine).map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {serverState.errors?.productLine && (
                  <FormMessage>{serverState.errors.productLine}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wantNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    {...field}
                    value="true"
                  />
                </FormControl>
                <FormLabel className="!mt-0">
                  Sign up for notifications from Tim Cook
                </FormLabel>
              </FormItem>
            )}
          />

          {form.watch('wantNotifications') && (
            <NotificationPreferences control={form.control} />
          )}

          <SubmitButton isPending={isPending}>Submit</SubmitButton>

          {showSuccess ? (
            <SuccessMessage projectCode={serverState.projectCode!} />
          ) : (
            serverState.message && (
              <p className="mt-4 text-red-500">{serverState.message}</p>
            )
          )}
        </form>
      </Form>
    </div>
  );
};

export default AddProjectForm;
