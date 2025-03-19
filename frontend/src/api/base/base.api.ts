import { ApiMethod } from '@/common/enums/enums';
import { ApiOptions } from '@/common/types/types';
import { useUserStore } from '@/stores/user.store';
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

    protected async fetch<T>(path: string = '', options?: Partial<ApiOptions>): Promise<T> {
        const { accessToken, } = useUserStore.getState();
        const {
            method = ApiMethod.GET,
            payload = null,
        } = options ?? {};

        console.log(`${this.baseUrl}${this.basePath}${path}`);

        const response = await fetch(`${this.baseUrl}${this.basePath}${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
            body: payload && JSON.stringify(payload),
        });
        if (response.status === 401) {
            useUserStore.setState({ accessToken: null });
        }
        const data = await response.json();

        return this.parseDates(data);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private parseDates(obj: any): any {
        if (obj === null || obj === undefined) return obj;

        if (typeof obj === 'string' && !isNaN(Date.parse(obj))) {
            return new Date(obj);
        }

        if (Array.isArray(obj)) {
            return obj.map(item => this.parseDates(item));
        }

        if (typeof obj === 'object') {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, this.parseDates(value)])
            );
        }

        return obj;
    }
}

export { BaseApi };
