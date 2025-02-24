import { ApiMethod } from '@/common/enums/enums';
import { ApiOptions } from '@/common/types/types';
import { env } from '@/env';

type Constructor = {
    basePath: string;
}

class BaseApi {
    private baseUrl: string;
    private basePath: string;

    constructor({ basePath }: Constructor) {
        this.baseUrl = env.apiOrigin;
        this.basePath = basePath;
    }

    public async fetch<T>(path: string = '', options?: Partial<ApiOptions>): Promise<T> {
        const {
            method = ApiMethod.GET,
            payload = null,
        } = options ?? {};

        console.log(`${this.baseUrl}${this.basePath}${path}`);

        const response = await fetch(`${this.baseUrl}${this.basePath}${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload && JSON.stringify(payload),
        });
        return response.json();
    }
}

export { BaseApi };
