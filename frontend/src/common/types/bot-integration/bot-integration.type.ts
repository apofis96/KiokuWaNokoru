import { BaseType } from "../base/base.type";

type BotIntegration = Pick<BaseType, 'id' | 'createdAt'> & {
    botProvider: number | null;
}

export type { BotIntegration };
