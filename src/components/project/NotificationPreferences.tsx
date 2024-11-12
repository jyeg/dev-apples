import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Control, Controller } from 'react-hook-form';
import { z } from 'zod';
import { addProjectFormSchema } from '@/lib/constants';
import { NotificationPreferences as NotificationPreferencesType } from '@/lib/types';

type NotificationPreferenceItemProps = {
  name: keyof NotificationPreferencesType;
  title: string;
  description: string;
  control: Control<z.infer<typeof addProjectFormSchema>>;
};

function NotificationPreferenceItem({
  name,
  title,
  description,
  control,
}: NotificationPreferenceItemProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="space-y-0.5">
        <Label className="text-base">{title}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Controller
        name={`notificationPreferences.${name}` as const}
        control={control}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            {...field}
            value="true"
          />
        )}
      />
    </div>
  );
}

export function NotificationPreferences({
  control,
}: {
  control: Control<z.infer<typeof addProjectFormSchema>>;
}) {
  return (
    <Card className="border-0 bg-muted/50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <NotificationPreferenceItem
            name="allNotifications"
            title="All notifications"
            description="Receive emails about new products, features, and more."
            control={control}
          />
          <NotificationPreferenceItem
            name="dailyDigest"
            title="Daily digest"
            description="Get a daily summary of all Apple news."
            control={control}
          />
          <NotificationPreferenceItem
            name="weeklyDigest"
            title="Weekly digest"
            description="Receive a weekly roundup of Apple updates."
            control={control}
          />
        </div>
      </CardContent>
    </Card>
  );
}
