import { botIntegrationApi } from '@/api/api';
import { QueryKey } from '@/common/enums/enums';
import { Button, Dialog, Portal, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Clipboard } from '@/components/components';

export interface CreateIntegrationProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const CreateIntegrationDialog = ({ isOpen, onOpenChange }: CreateIntegrationProps) => {
  const botIntegration = useQuery({
    queryKey: [QueryKey.CreateBotIntegration],
    queryFn: async () => await botIntegrationApi.createIntegration(),
    enabled: isOpen,
  });

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={details => onOpenChange(details.open)}>
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
    </Dialog.Root>
  );
};

export { CreateIntegrationDialog };
