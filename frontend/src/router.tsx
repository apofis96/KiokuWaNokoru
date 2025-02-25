import { Routes, Route } from 'react-router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { IntegrationsPage } from './pages/integrations-page/integrations-page';
import { Flex, Box } from '@chakra-ui/react';
import { Sidebar } from './components/components';
import { Page } from './common/enums/enums';

const Router = () => {
  return (
    <Flex height='100vh'>
      <Sidebar />
      <Flex grow={1}>
        <Box p={{ base: '0.5em' }}>
          <Routes>
            <Route path={Page.Dashboard} element={<DashboardPage />} />
            <Route path={Page.Integrations} element={<IntegrationsPage />} />
          </Routes>
        </Box>
      </Flex>
    </Flex>
  );
};

export { Router };
