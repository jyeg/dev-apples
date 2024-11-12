export enum ProductLine {
  IPHONE = 'iPhone',
  IPAD = 'iPad',
  MAC = 'Mac',
  VISION_PRO = 'Vision Pro',
  OTHER = 'Other',
}

export type NotificationPreferences = {
  allNotifications: boolean;
  dailyDigest: boolean;
  weeklyDigest: boolean;
};
