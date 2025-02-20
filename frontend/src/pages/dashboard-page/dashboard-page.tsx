import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import './dashboard-page.scss';
import { CreateReminderDrawer } from './components/create-reminder-drawer/create-reminder-drawer';
import { useDrawerStore } from '@/stores/drawer.store';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toggleCreateReminderOpen } = useDrawerStore();

  return (
    <>
      <div className='dashboard-page'>
        <Button onClick={() => navigate('/integrations')}>GoTo integrations</Button>
        <Button onClick={toggleCreateReminderOpen}>Test</Button>
        <CreateReminderDrawer />
      </div>
    </>
  );
};

export { DashboardPage };
