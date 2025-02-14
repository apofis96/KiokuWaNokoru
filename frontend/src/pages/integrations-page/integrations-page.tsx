import { Button, Spinner } from '@chakra-ui/react';
import { useTestStore } from '../../stores/test.store';
import './integration-page.scss';

const IntegrationsPage = () => {
  const { count, increment, title, fetchTitle, isLoading } = useTestStore();

  return (
    <>
      {isLoading && <Spinner size='xl' />}
      <Button onClick={() => increment()}>Increment {count}</Button>
      <p>{title}</p>
      <Button onClick={() => fetchTitle()}>Fetch Title</Button>
    </>
  );
};

export { IntegrationsPage };
