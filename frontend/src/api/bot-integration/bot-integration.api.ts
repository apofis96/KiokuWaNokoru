import { BotIntegration, CreateBotIntegration, TableType } from "@/common/types/types";
import { BaseApi } from "../base/base.api";
import { ApiMethod } from "@/common/enums/enums";

class BotIntegrationApi extends BaseApi {

    async createIntegration() {
        return this.fetch<CreateBotIntegration>(
            '/initialize',
            {
                method: ApiMethod.GET,
            }
        );
    }

    async getAllIntegrations() {
        return this.fetch<TableType<BotIntegration>>(
            '/all',
            {
                method: ApiMethod.GET,
            }
        );
    }

    async removeIntegration(id: string) {
        return this.fetch<void>(
            `/${id}`,
            {
                method: ApiMethod.DELETE,
            }
        );
    }
}

const botIntegrationApi = new BotIntegrationApi({
    basePath: '/userBotIntegration'
});

export { botIntegrationApi };
