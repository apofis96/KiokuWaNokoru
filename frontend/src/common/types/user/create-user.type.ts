import { User } from './user.type';

type CreateUser = Pick<User, 'username' | 'email'> & {
    password: string;
};

export type { CreateUser };
