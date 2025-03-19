import './integration-page.scss';
import { CreateIntegrationDialog } from './components/create-integration-dialog/create-integration-dialog';
import { IntegrationsTable } from './components/integrations-table/integrations-table';

const IntegrationsPage = () => {
  return (
    <>
      <CreateIntegrationDialog />
      <IntegrationsTable />
    </>
  );
};

export { IntegrationsPage };
