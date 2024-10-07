'use client';

import { DomIds } from '@/models/enums';
import { convertToClass } from '@/utils/convert-to-class.util';
import './notification.css';
import { useEffect } from 'react';
import { NotificationController } from '@/components/notification/notification.controller';

const hostClass = convertToClass([
  'notification',
  'bg-custom-black-1',
  'shadow-custom-red',
  'z-40',
  'px-4 py-2',
  'rounded-lg',
  'border-red',
  'max-w-80',
  'hidden',
]);

const NOTIFICATION_ANIMATION_DURATION = 300;
const NOTIFICATION_DISPLAY_DURATION = 4000;

export function Notification() {

  useEffect(() => {
    // @ts-expect-error need
    if (!document?.[NotificationController.NAME]) {
      // @ts-expect-error need
      document[NotificationController.NAME] = new NotificationController(
        NOTIFICATION_ANIMATION_DURATION,
        NOTIFICATION_DISPLAY_DURATION,
      );
    }
  }, []);

  return <div
    // @ts-expect-error need
    style={{'--notification-animation-duration': `${NOTIFICATION_ANIMATION_DURATION}ms`}}
    id={DomIds.NOTIFICATION} className={hostClass}
  ></div>;
}
