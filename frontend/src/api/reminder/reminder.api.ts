import { CreateReminder, Reminder, TableType } from "@/common/types/types";
import { BaseApi } from "../base/base.api";
import { ApiMethod } from "@/common/enums/enums";

class ReminderApi extends BaseApi {

    async createReminder(data: CreateReminder) {
        return this.fetch(
            '',
            {
                method: ApiMethod.POST,
                payload: data
            }
        );
    }

    async getAllReminders() {
        return this.fetch<TableType<Reminder>>(
            '/all',
            {
                method: ApiMethod.GET,
            }
        );
    }

    async removeReminder(id: string) {
        return this.fetch<void>(
            `/${id}`,
            {
                method: ApiMethod.DELETE,
            }
        );
    }
}

const reminderApi = new ReminderApi({
    basePath: '/reminder'
});

export { reminderApi };
