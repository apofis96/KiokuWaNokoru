import { Routes, Route } from 'react-router';
import { Flex, Box } from '@chakra-ui/react';
import { Sidebar } from './components/components';
import { Page } from './common/enums/enums';
import { DashboardPage, IntegrationsPage, RegisterPage, LoginPage } from './pages/pages';

const Router = () => {
  return (
    <Flex height='100vh'>
      <Sidebar />
      <Flex grow={1}>
        <Box p={{ base: '0.5em' }}>
          <Routes>
            <Route path={Page.Dashboard} element={<DashboardPage />} />
            <Route path={Page.Integrations} element={<IntegrationsPage />} />
            <Route path={Page.Register} element={<RegisterPage />} />
            <Route path={Page.Login} element={<LoginPage />} />
          </Routes>
        </Box>
      </Flex>
    </Flex>
  );
};

export { Router };
