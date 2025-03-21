import { Reminder } from './reminder.type';

type CreateReminder = Pick<Reminder, 'title' | 'description' | 'isRecurring' | 'recurrenceType' | 'recurrenceValue' | 'nextFireAt'>;

export type { CreateReminder };
