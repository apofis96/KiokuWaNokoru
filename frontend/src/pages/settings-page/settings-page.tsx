import { userSettingsApi } from '@/api/api';
import { QueryKey } from '@/common/enums/enums';
import { useHeader } from '@/common/hooks/hooks';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { UserSettingsForm } from '@/forms/user-settings/user-settings-form';
import { AbsoluteCenter, Button, Card, Show } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

const SettingsPage = () => {
  useHeader('Settings');
  const settings = useQuery({
    queryKey: [QueryKey.UserSettings],
    queryFn: async () => await userSettingsApi.getSettings(),
  });
  const formRef = useRef<FormRef>(null);

  return (
    <AbsoluteCenter axis='both'>
      <Card.Root w='lg'>
        <Card.Body margin='5% 0 50% 0'>
          <Show when={settings.isLoading}>
            <div>Loading...</div>
          </Show>
          <Show when={settings.data}>
            <UserSettingsForm userSettings={settings.data!} ref={formRef} />
          </Show>
        </Card.Body>
        <Card.Footer justifyContent='flex-end'>
          <Button disabled={settings.isLoading} onClick={() => formRef.current?.submit()}>
            Save
          </Button>
        </Card.Footer>
      </Card.Root>
    </AbsoluteCenter>
  );
};

export { SettingsPage };
