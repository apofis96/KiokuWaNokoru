import { botIntegrationApi } from '@/api/api';
import { QueryKey } from '@/common/enums/enums';
import { ActionBar, Button, Checkbox, Portal, Table } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const IntegrationsTable = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const botIntegrations = useQuery({
    queryKey: [QueryKey.BotIntegrations],
    queryFn: async () => await botIntegrationApi.getAllIntegrations(),
  });

  const items = botIntegrations.data?.items || [];
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  const rows = items.map(item => (
    <Table.Row key={item.id} data-selected={selection.includes(item.id) ? '' : undefined}>
      <Table.Cell>
        <Checkbox.Root
          size='sm'
          top='0.5'
          aria-label='Select row'
          checked={selection.includes(item.id)}
          onCheckedChange={changes => {
            setSelection(prev => (changes.checked ? [...prev, item.id] : selection.filter(name => name !== item.id)));
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell>{item.id}</Table.Cell>
      <Table.Cell>{item.botProvider}</Table.Cell>
      <Table.Cell>{item.createdAt.toDateString()}</Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w='6'>
              <Checkbox.Root
                size='sm'
                top='0.5'
                aria-label='Select all rows'
                checked={indeterminate ? 'indeterminate' : selection.length > 0}
                onCheckedChange={changes => {
                  setSelection(changes.checked ? items.map(item => item.id) : []);
                }}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
            </Table.ColumnHeader>
            <Table.ColumnHeader>Id</Table.ColumnHeader>
            <Table.ColumnHeader>Provider</Table.ColumnHeader>
            <Table.ColumnHeader>Created at</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>

      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>{selection.length} selected</ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant='outline' size='sm'>
                Delete
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
};

export { IntegrationsTable };
