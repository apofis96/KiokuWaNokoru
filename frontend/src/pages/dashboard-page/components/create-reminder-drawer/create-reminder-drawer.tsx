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
import { Button } from '@chakra-ui/react';
import { useDrawerStore } from '@/stores/drawer.store';
import { CreateReminderForm } from '@/forms/reminder/create-reminder-form/create-reminder-form';
import { useRef } from 'react';
import { FormRef } from '@/common/interfaces/form-ref.interface';

const CreateReminderDrawer = () => {
  const { isCreateReminderOpen, toggleCreateReminderOpen } = useDrawerStore();
  const formRef = useRef<FormRef>(null);

  return (
    <DrawerRoot open={isCreateReminderOpen} onOpenChange={toggleCreateReminderOpen}>
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Reminder</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <CreateReminderForm ref={formRef} />
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
