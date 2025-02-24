import { CreateReminder, Reminder } from "@/common/types/types";
import { BaseApi } from "../base/base.api";
import { ApiMethod } from "@/common/enums/enums";

class ReminderApi extends BaseApi {

    async getAllReminders() {
        const response = await this.fetch<Reminder[]>();
        return response;
    }

    async createReminder(data: CreateReminder) {
        return this.fetch(
            '',
            {
                method: ApiMethod.POST,
                payload: data
            }
        );
    }
}

const reminderApi = new ReminderApi({
    basePath: '/reminder'
});

export { reminderApi };
