import { Reminder } from './reminder.type';

type CreateReminder = Pick<Reminder, 'title' | 'description'>;

export type { CreateReminder };
