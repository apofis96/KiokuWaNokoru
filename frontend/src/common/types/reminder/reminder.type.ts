import { BaseType } from '../base/base.type';

type Reminder = BaseType & {
    title: string;
    description?: string;
}

export type { Reminder };
