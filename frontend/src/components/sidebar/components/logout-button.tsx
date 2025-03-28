import { Button, Group, Heading, IconButton, Popover, Portal } from '@chakra-ui/react';
import { LuLogOut } from 'react-icons/lu';
import { useUserStore } from '@/stores/user.store';

const LogoutButton = () => {
  const logout = useUserStore(state => state.logout);
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton marginTop='auto' variant={'ghost'}>
          <LuLogOut />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>
              <Heading size='lg'>Log Out</Heading>
            </Popover.Header>
            <Popover.Arrow />
            <Popover.Body>Are you sure want to log out?</Popover.Body>
            <Popover.Footer>
              <Group marginLeft={'auto'}>
                <Button size='sm' onClick={() => logout()}>
                  Yes
                </Button>
                <Popover.CloseTrigger asChild>
                  <Button size='sm'>No</Button>
                </Popover.CloseTrigger>
              </Group>
            </Popover.Footer>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export { LogoutButton };
