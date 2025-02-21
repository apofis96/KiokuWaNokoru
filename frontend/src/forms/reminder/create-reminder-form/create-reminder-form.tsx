import { CreateReminder } from '@/common/types/types';
import { Field } from '@/components/ui/field';
import { Fieldset, Input } from '@chakra-ui/react';
import { useImperativeHandle, forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { titleValidation } from '@/common/validation-rules/validation-rules';

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

  const onSubmit: SubmitHandler<CreateReminder> = data => {
    console.log(data);
  };

  return (
    <Fieldset.Root size='lg' maxW='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </Fieldset.Root>
  );
});

export { CreateReminderForm };
