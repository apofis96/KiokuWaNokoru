import './integration-page.scss';
import { CreateIntegrationDialog } from './components/create-integration-dialog/create-integration-dialog';
import { IntegrationsTable } from './components/integrations-table/integrations-table';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { PageRef } from '@/common/interfaces/page-ref.interface';
import { useHeader } from '@/common/hooks/hooks';

const IntegrationsPage = forwardRef<PageRef>((_, ref) => {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  useHeader('Integrations', ['Create Integration']);
  useImperativeHandle(ref, () => ({
    action(id: string) {
      if (id === 'Create Integration') {
        setCreateDialogOpen(true);
      }
    },
  }));

  return (
    <>
      <CreateIntegrationDialog isOpen={isCreateDialogOpen} onOpenChange={isOpen => setCreateDialogOpen(isOpen)} />
      <IntegrationsTable />
    </>
  );
});

export { IntegrationsPage };
