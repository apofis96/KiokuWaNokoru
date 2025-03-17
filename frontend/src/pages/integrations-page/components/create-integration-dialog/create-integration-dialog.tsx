import { botIntegrationApi } from '@/api/api';
import { QueryKey } from '@/common/enums/enums';
import { Button, Dialog, Portal, Spinner, useDialog } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Clipboard } from '@/components/components';

const CreateIntegrationDialog = () => {
  const dialog = useDialog();

  const botIntegration = useQuery({
    queryKey: [QueryKey.CreateBotIntegration],
    queryFn: async () => await botIntegrationApi.createIntegration(),
    enabled: dialog.open,
  });

  return (
    <Dialog.RootProvider lazyMount value={dialog}>
      <Dialog.Trigger asChild>
        <Button size='sm'>Create Integration</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create Integration</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {!botIntegration.data && <Spinner size='xl' />}
              {!!botIntegration.data && <Clipboard label='Code' value={botIntegration.data.id} />}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button>Close</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
};

export { CreateIntegrationDialog };
