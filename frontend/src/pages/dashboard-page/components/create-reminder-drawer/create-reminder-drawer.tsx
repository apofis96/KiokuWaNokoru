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

const CreateReminderDrawer = () => {
  const { isCreateReminderOpen, toggleCreateReminderOpen } = useDrawerStore();

  return (
    <DrawerRoot open={isCreateReminderOpen} onOpenChange={toggleCreateReminderOpen}>
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <CreateReminderForm />
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerActionTrigger>
          <Button>Save</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export { CreateReminderDrawer };
