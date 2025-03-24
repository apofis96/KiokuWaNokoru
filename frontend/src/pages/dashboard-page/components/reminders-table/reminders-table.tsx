import { reminderApi } from '@/api/api';
import { QueryKey } from '@/common/enums/enums';
import { ActionBar, Button, Checkbox, Portal, Table } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const RemindersTable = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const reminders = useQuery({
    queryKey: [QueryKey.Reminders],
    queryFn: async () => await reminderApi.getAllReminders(),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (selectedIds: string[]) => Promise.all(selectedIds.map(id => reminderApi.removeReminder(id))),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Reminders],
      });
      setSelection([]);
    },
  });

  const items = reminders.data?.items || [];
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
      <Table.Cell>{item.title}</Table.Cell>
      <Table.Cell>{item.description}</Table.Cell>
      <Table.Cell>{item.isRecurring}</Table.Cell>
      <Table.Cell>{item.recurrenceType}</Table.Cell>
      <Table.Cell>{item.recurrenceValue}</Table.Cell>
      <Table.Cell>{item.nextFireAt.toDateString()}</Table.Cell>
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
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Recurring</Table.ColumnHeader>
            <Table.ColumnHeader>Recurrence type</Table.ColumnHeader>
            <Table.ColumnHeader>Recurrence value</Table.ColumnHeader>
            <Table.ColumnHeader>Next fire at</Table.ColumnHeader>
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
              <Button
                variant='outline'
                size='sm'
                onClick={() => mutation.mutate(selection)}
                disabled={mutation.isPending}
              >
                Delete
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
};

export { RemindersTable };
