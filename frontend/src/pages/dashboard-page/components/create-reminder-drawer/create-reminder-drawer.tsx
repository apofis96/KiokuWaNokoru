import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button, Show } from '@chakra-ui/react';
import { useDrawerStore } from '@/stores/drawer.store';
import { CreateReminderForm } from '@/forms/reminder/create-reminder-form/create-reminder-form';
import { useRef } from 'react';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { QueryKey } from '@/common/enums/enums';
import { useQuery } from '@tanstack/react-query';
import { reminderApi } from '@/api/api';

const CreateReminderDrawer = () => {
  const { isCreateReminderOpen, editReminderId, toggleCreateReminderOpen } = useDrawerStore();
  const formRef = useRef<FormRef>(null);
  const reminder = useQuery({
    queryKey: [QueryKey.Reminders, editReminderId],
    queryFn: async () => await reminderApi.getReminder(editReminderId!),
    enabled: !!editReminderId,
  });

  return (
    <DrawerRoot size={'md'} open={isCreateReminderOpen} onOpenChange={() => toggleCreateReminderOpen(null)}>
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{!editReminderId ? 'Create' : 'Edit'} Reminder</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Show when={!!editReminderId && reminder.isLoading}>
            <div>Loading...</div>
          </Show>
          <Show when={!editReminderId || reminder.data}>
            <CreateReminderForm reminder={reminder?.data || null} ref={formRef} />
          </Show>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerActionTrigger>
          <Button onClick={() => formRef.current?.submit()}>Save</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export { CreateReminderDrawer };
