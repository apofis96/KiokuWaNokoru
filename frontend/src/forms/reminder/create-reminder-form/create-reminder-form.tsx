import { CreateReminder } from '@/common/types/types';
import { Field } from '@/components/ui/field';
import { Fieldset, Input, Stack } from '@chakra-ui/react';
import { useImperativeHandle, forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { titleValidation } from '@/common/validation-rules/validation-rules';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reminderApi } from '@/api/api';
import { useDrawerStore } from '@/stores/drawer.store';
import { QueryKey } from '@/common/enums/enums';

const CreateReminderForm = forwardRef<FormRef>((_, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReminder>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit(onSubmit)();
    },
  }));

  const { toggleCreateReminderOpen } = useDrawerStore();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newReminder: CreateReminder) => reminderApi.createReminder(newReminder),
    onSuccess: () => {
      toggleCreateReminderOpen();
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Reminders],
      });
    },
  });

  const onSubmit: SubmitHandler<CreateReminder> = data => {
    mutation.mutate(data);
  };

  return (
    <Fieldset.Root size='lg' maxW='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap='4' w='full'>
          <Fieldset.Content>
            <Controller
              control={control}
              name='title'
              rules={titleValidation}
              render={({ field }) => (
                <Field label='Name' invalid={!!errors.title} errorText={errors.title?.message}>
                  <Input {...field} />
                </Field>
              )}
            />
          </Fieldset.Content>

          <Fieldset.Content>
            <Field label='Description'>
              <Controller control={control} name='description' render={({ field }) => <Input {...field} />} />
            </Field>
          </Fieldset.Content>
        </Stack>
      </form>
    </Fieldset.Root>
  );
});

export { CreateReminderForm };
