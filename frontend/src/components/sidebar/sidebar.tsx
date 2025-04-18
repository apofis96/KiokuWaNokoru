import { Box, Stack, IconButton } from '@chakra-ui/react';
import { LuCalendarFold, LuBotMessageSquare, LuSettings } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router';
import { Page } from '@/common/enums/enums';
import { LogoutButton } from './components/logout-button';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getIconVariant = (page: string) => (location.pathname === page ? 'solid' : 'surface');

  return (
    <Box bg='gray.950' color='white' p={4}>
      <Stack height={'100%'}>
        <IconButton
          onClick={() => navigate(Page.Dashboard)}
          aria-label='Dashboard'
          variant={getIconVariant(Page.Dashboard)}
        >
          <LuCalendarFold />
        </IconButton>
        <IconButton
          onClick={() => navigate(Page.Integrations)}
          aria-label='Integrations'
          variant={getIconVariant(Page.Integrations)}
        >
          <LuBotMessageSquare />
        </IconButton>
        <IconButton
          onClick={() => navigate(Page.Settings)}
          aria-label='Settings'
          variant={getIconVariant(Page.Settings)}
        >
          <LuSettings />
        </IconButton>
        <LogoutButton />
      </Stack>
    </Box>
  );
};

export { Sidebar };
