import { Button } from '@chakra-ui/react';
import { CreateReminderDrawer } from './components/create-reminder-drawer/create-reminder-drawer';
import { useDrawerStore } from '@/stores/drawer.store';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@/common/enums/enums';
import { reminderApi } from '@/api/api';
import './dashboard-page.scss';

const DashboardPage = () => {
  const { toggleCreateReminderOpen } = useDrawerStore();

  const reminders = useQuery({
    queryKey: [QueryKey.Reminders],
    queryFn: async () => await reminderApi.getAllReminders(),
  });

  return (
    <>
      <div className='dashboard-page'>
        <Button onClick={toggleCreateReminderOpen}>Test</Button>
        <CreateReminderDrawer />
      </div>
      {reminders.isLoading && <div>Loading...</div>}
      {reminders.isError && <div>Error</div>}
      {reminders.isSuccess && reminders.data.map(x => <div key={x.id}>{x.title}</div>)}
    </>
  );
};

export { DashboardPage };
