import { Separator, Stack, Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import './dashboard-page.scss';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack>
        <Text>First</Text>
        <Separator />
        <Text>Second</Text>
        <Separator />
        <Text>Third</Text>
        <Separator />
      </Stack>
      <Button onClick={() => navigate('/integrations')}>GoTo integrations</Button>
    </>
  );
};

export { DashboardPage };
