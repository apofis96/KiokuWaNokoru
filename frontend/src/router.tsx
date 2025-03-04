import { Routes, Route } from 'react-router';
import { Flex, Box } from '@chakra-ui/react';
import { Sidebar } from './components/components';
import { Page } from './common/enums/enums';
import { DashboardPage, IntegrationsPage, RegisterPage, LoginPage } from './pages/pages';
import { useUserStore } from './stores/user.store';

const Router = () => {
  const accessToken = useUserStore(state => state.accessToken);
  const isAuthorized = !!accessToken;

  return (
    <Flex height='100vh'>
      {isAuthorized && <Sidebar />}
      <Flex grow={1}>
        <Box p={{ base: '0.5em' }}>
          <Routes>
            {isAuthorized && <Route path={Page.Dashboard} element={<DashboardPage />} />}
            {isAuthorized && <Route path={Page.Integrations} element={<IntegrationsPage />} />}
            {!isAuthorized && <Route path={Page.Register} element={<RegisterPage />} />}
            {!isAuthorized && <Route path={Page.Login} element={<LoginPage />} />}
            <Route path='*' element={isAuthorized ? <DashboardPage /> : <LoginPage />} />
          </Routes>
        </Box>
      </Flex>
    </Flex>
  );
};

export { Router };
