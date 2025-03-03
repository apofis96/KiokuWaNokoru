import { CreateUser, User, LoginUserRequest, LoginUserResponse } from "@/common/types/types";
import { BaseApi } from "../base/base.api";
import { ApiMethod } from "@/common/enums/enums";

class UserApi extends BaseApi {
    async createUser(data: CreateUser) {
        const response = await this.fetch<User>(
            '/register',
            {
                method: ApiMethod.POST,
                payload: data
            }
        );

        return response;
    }
    async loginUser(data: LoginUserRequest) {
        const response = await this.fetch<LoginUserResponse>(
            '/login',
            {
                method: ApiMethod.POST,
                payload: data
            }
        );

        return response;
    }
}

const userApi = new UserApi({
    basePath: '/user'
});

export { userApi };
