import { CreateUser } from './create-user.type';

type LoginUserRequest = Pick<CreateUser, 'email' | 'password'>;

export type { LoginUserRequest };
