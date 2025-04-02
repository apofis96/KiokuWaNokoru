import { CreateReminderDrawer } from './components/create-reminder-drawer/create-reminder-drawer';
import { useDrawerStore } from '@/stores/drawer.store';
import './dashboard-page.scss';
import { RemindersTable } from './components/reminders-table/reminders-table';
import { useHeaderStore } from '@/stores/header.store';
import { forwardRef, useImperativeHandle } from 'react';
import { PageRef } from '@/common/interfaces/page-ref.interface';

const DashboardPage = forwardRef<PageRef>((_, ref) => {
  const { toggleCreateReminderOpen } = useDrawerStore();
  const setNavigation = useHeaderStore(state => state.setNavigation);
  setNavigation('Dashboard', ['Create Reminder']);
  useImperativeHandle(ref, () => ({
    action(id: string) {
      if (id === 'Create Reminder') {
        toggleCreateReminderOpen(null);
      }
    },
  }));

  return (
    <>
      <div className='dashboard-page'>
        <CreateReminderDrawer />
        <RemindersTable />
      </div>
    </>
  );
});

export { DashboardPage };
