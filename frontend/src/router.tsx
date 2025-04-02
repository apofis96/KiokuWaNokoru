import { Routes, Route } from 'react-router';
import { Flex, Box } from '@chakra-ui/react';
import { Header, Sidebar } from './components/components';
import { Page } from './common/enums/enums';
import { DashboardPage, IntegrationsPage, RegisterPage, LoginPage } from './pages/pages';
import { useUserStore } from './stores/user.store';
import { PageRef } from './common/interfaces/page-ref.interface';
import { useRef } from 'react';

const Router = () => {
  const pageRef = useRef<PageRef>(null);
  const accessToken = useUserStore(state => state.accessToken);
  const isAuthorized = !!accessToken;
  const handleHeaderClick = (id: string) => {
    if (pageRef.current) {
      pageRef.current.action(id);
    }
  };

  return (
    <Flex height='100vh'>
      {isAuthorized && <Sidebar />}
      <Box flexGrow={1}>
        <Header onActionClick={handleHeaderClick} />
        <Flex grow={1}>
          <Box width='full'>
            <Routes>
              {isAuthorized && <Route path={Page.Dashboard} element={<DashboardPage ref={pageRef} />} />}
              {isAuthorized && <Route path={Page.Integrations} element={<IntegrationsPage ref={pageRef} />} />}
              {!isAuthorized && <Route path={Page.Register} element={<RegisterPage />} />}
              {!isAuthorized && <Route path={Page.Login} element={<LoginPage />} />}
              <Route path='*' element={isAuthorized ? <DashboardPage /> : <LoginPage />} />
            </Routes>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export { Router };
