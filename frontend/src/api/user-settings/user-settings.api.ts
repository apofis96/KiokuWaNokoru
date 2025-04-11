import { UserSettings } from "@/common/types/types";
import { BaseApi } from "../base/base.api";
import { ApiMethod } from "@/common/enums/enums";

class UserSettingsApi extends BaseApi {
    async getSettings() {
        const response = await this.fetch<UserSettings>(
            '',
            {
                method: ApiMethod.GET,
            }
        );

        return response;
    }
    async setSettings(data: UserSettings) {
        const response = await this.fetch<UserSettings>(
            '',
            {
                method: ApiMethod.PUT,
                payload: data
            }
        );

        return response;
    }
}

const userSettingsApi = new UserSettingsApi({
    basePath: '/userSettings'
});

export { userSettingsApi };
