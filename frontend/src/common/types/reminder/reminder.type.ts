import { ValueOf } from '@/common/helpers/value-of.helper';
import { BaseType } from '../base/base.type';
import { Recurrence } from '@/common/enums/enums';

type Reminder = BaseType & {
    title: string;
    description?: string;
    isRecurring: boolean;
    recurrenceType: ValueOf<typeof Recurrence>;
    recurrenceValue: string;
    nextFireAt: Date;
}

export type { Reminder };
