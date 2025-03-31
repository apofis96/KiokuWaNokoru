import './integration-page.scss';
import { CreateIntegrationDialog } from './components/create-integration-dialog/create-integration-dialog';
import { IntegrationsTable } from './components/integrations-table/integrations-table';
import { useHeaderStore } from '@/stores/header.store';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { PageRef } from '@/common/interfaces/page-ref.interface';

const IntegrationsPage = forwardRef<PageRef>((_, ref) => {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const setNavigation = useHeaderStore(state => state.setNavigation);
  setNavigation('Integrations', ['Create Integration']);
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
