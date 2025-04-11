import { UserSettings } from '@/common/types/types';
import { Field } from '@/components/ui/field';
import { Fieldset, Input, Stack } from '@chakra-ui/react';
import { useImperativeHandle, forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userSettingsApi } from '@/api/api';
import { QueryKey } from '@/common/enums/enums';

export interface UserSettingsFormProps {
  userSettings: UserSettings;
}

const UserSettingsForm = forwardRef<FormRef, UserSettingsFormProps>(({ userSettings }, ref) => {
  const { control, setValue, handleSubmit } = useForm<UserSettings>({
    defaultValues: {
      notificationTime: userSettings.notificationTime,
    },
  });

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit(onSubmit)();
    },
  }));

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedUserSettings: UserSettings) => userSettingsApi.setSettings(updatedUserSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.UserSettings],
      });
    },
  });

  const onSubmit: SubmitHandler<UserSettings> = data => {
    mutation.mutate(data);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('notificationTime', e.target.value + ':00');
  };

  return (
    <Fieldset.Root size='lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap='4' w='full'>
          <Fieldset.Content>
            <Field label='Notification Time'>
              <Controller
                control={control}
                name='notificationTime'
                render={({ field }) => <Input type='time' {...field} onChange={handleDateChange} />}
              />
            </Field>
          </Fieldset.Content>
        </Stack>
      </form>
    </Fieldset.Root>
  );
});

export { UserSettingsForm };
