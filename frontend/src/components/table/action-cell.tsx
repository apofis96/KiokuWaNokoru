import { IconButton, Show, Table } from '@chakra-ui/react';
import { LuPencilLine, LuTrash } from 'react-icons/lu';
import { Tooltip } from '../ui/tooltip';

export interface ActionCellProps {
  id: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ActionCell = ({ id, onEdit, onDelete }: ActionCellProps) => {
  return (
    <Table.Cell>
      <Show when={!!onEdit}>
        <Tooltip content='Edit item'>
          <IconButton onClick={() => onEdit?.(id)} variant='ghost' size='xs'>
            <LuPencilLine />
          </IconButton>
        </Tooltip>
      </Show>
      <Show when={!!onDelete}>
        <Tooltip content='Remove item'>
          <IconButton onClick={() => onDelete?.(id)} variant='ghost' size='xs'>
            <LuTrash />
          </IconButton>
        </Tooltip>
      </Show>
    </Table.Cell>
  );
};

export { ActionCell };
