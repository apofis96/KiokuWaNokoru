import { Button } from '@chakra-ui/react';
import { CreateReminderDrawer } from './components/create-reminder-drawer/create-reminder-drawer';
import { useDrawerStore } from '@/stores/drawer.store';
import './dashboard-page.scss';
import { RemindersTable } from './components/reminders-table/reminders-table';

const DashboardPage = () => {
  const { toggleCreateReminderOpen } = useDrawerStore();

  return (
    <>
      <div className='dashboard-page'>
        <Button onClick={toggleCreateReminderOpen}>Test</Button>
        <CreateReminderDrawer />
        <RemindersTable />
      </div>
    </>
  );
};

export { DashboardPage };
