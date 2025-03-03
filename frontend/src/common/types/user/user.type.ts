import { BaseType } from '../base/base.type';

type User = BaseType & {
    username: string;
    email: string;
}

export type { User };
