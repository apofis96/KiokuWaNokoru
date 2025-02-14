import { Routes, Route } from 'react-router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { IntegrationsPage } from './pages/integrations-page/integrations-page';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/integrations' element={<IntegrationsPage />} />
    </Routes>
  );
};

export { Router };
