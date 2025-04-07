import { CreateReminder, Reminder } from '@/common/types/types';
import { Field } from '@/components/ui/field';
import { Fieldset, Input, NativeSelect, Stack, Switch } from '@chakra-ui/react';
import { useImperativeHandle, forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { titleValidation } from '@/common/validation-rules/validation-rules';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reminderApi } from '@/api/api';
import { useDrawerStore } from '@/stores/drawer.store';
import { QueryKey, Recurrence } from '@/common/enums/enums';

export interface CreateReminderFormProps {
  reminder: Reminder | null;
}

const CreateReminderForm = forwardRef<FormRef, CreateReminderFormProps>(({ reminder }, ref) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReminder>({
    defaultValues: {
      title: reminder?.title || '',
      description: reminder?.description || '',
      nextFireAt: reminder?.nextFireAt || new Date(),
      isRecurring: reminder?.isRecurring || false,
      recurrenceType: reminder?.recurrenceType || Recurrence.Cron,
      recurrenceValue: reminder?.recurrenceValue || '',
      isOfNotificationTime: reminder?.isOfNotificationTime || false,
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
    mutationFn: (newReminder: CreateReminder) =>
      !reminder?.id ? reminderApi.createReminder(newReminder) : reminderApi.updateReminder(reminder!.id, newReminder),
    onSuccess: () => {
      toggleCreateReminderOpen(null);
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Reminders],
      });
    },
  });

  const onSubmit: SubmitHandler<CreateReminder> = data => {
    const payload = {
      ...data,
      recurrenceType: Number(data.recurrenceType),
    } as CreateReminder;
    mutation.mutate(payload);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('nextFireAt', new Date(e.target.value));
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
                <Field label='Title' invalid={!!errors.title} errorText={errors.title?.message}>
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

          <Fieldset.Content>
            <Field label='Recurring'>
              <Controller
                control={control}
                name='isRecurring'
                render={({ field }) => (
                  <Switch.Root
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={({ checked }) => field.onChange(checked)}
                  >
                    <Switch.HiddenInput onBlur={field.onBlur} />
                    <Switch.Control />
                    <Switch.Label>{field.value ? 'Yes' : 'No'}</Switch.Label>
                  </Switch.Root>
                )}
              />
            </Field>
          </Fieldset.Content>

          <Fieldset.Content>
            <Field label='Recurrence Type'>
              <Controller
                control={control}
                name='recurrenceType'
                render={({ field }) => (
                  <NativeSelect.Root {...field}>
                    <NativeSelect.Field>
                      <option value={Recurrence.Cron}>Cron</option>
                      <option value={Recurrence.Days}>Days</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                )}
              />
            </Field>
          </Fieldset.Content>

          <Fieldset.Content>
            <Field label='Recurrence Value'>
              <Controller control={control} name='recurrenceValue' render={({ field }) => <Input {...field} />} />
            </Field>
          </Fieldset.Content>

          <Fieldset.Content>
            <Field label='Is Of Notification Time'>
              <Controller
                control={control}
                name='isOfNotificationTime'
                render={({ field }) => (
                  <Switch.Root
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={({ checked }) => field.onChange(checked)}
                  >
                    <Switch.HiddenInput onBlur={field.onBlur} />
                    <Switch.Control />
                    <Switch.Label>{field.value ? 'Yes' : 'No'}</Switch.Label>
                  </Switch.Root>
                )}
              />
            </Field>
          </Fieldset.Content>

          <Fieldset.Content>
            <Field label='Fire Date'>
              <Controller
                control={control}
                name='nextFireAt'
                render={({ field }) => (
                  <Input
                    type='datetime-local'
                    {...field}
                    value={field.value.toLocaleString('sv')}
                    onChange={handleDateChange}
                  />
                )}
              />
            </Field>
          </Fieldset.Content>
        </Stack>
      </form>
    </Fieldset.Root>
  );
});

export { CreateReminderForm };
