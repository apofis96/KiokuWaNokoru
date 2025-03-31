import { useHeaderStore } from '@/stores/header.store';
import { Button, For, Heading, HStack } from '@chakra-ui/react';

export interface HeaderProps {
  onActionClick: (id: string) => void;
}

const Header = ({ onActionClick }: HeaderProps) => {
  const { title, actions } = useHeaderStore();
  return (
    <HStack bg='gray.900' padding={4} color='white' height='4em' align={'center'} justifyContent='space-between'>
      <HStack>
        <Heading size='lg' width='15em'>
          {title}
        </Heading>
        <For each={actions}>
          {action => (
            <Button key={action} onClick={() => onActionClick(action)} colorScheme='teal'>
              {action}
            </Button>
          )}
        </For>
      </HStack>

      <Heading size='2xl'>KiokuWaNokoru</Heading>
    </HStack>
  );
};

export { Header };
