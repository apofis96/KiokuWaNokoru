import { LoginUserRequest } from '@/common/types/types';
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Fieldset, Input, Stack } from '@chakra-ui/react';
import { useImperativeHandle, forwardRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { emailValidation, passwordValidation } from '@/common/validation-rules/validation-rules';

interface LoginUserFormProps {
  onSubmit: (loginUser: LoginUserRequest) => void;
}

const LoginUserForm = forwardRef<FormRef, LoginUserFormProps>(({ onSubmit }, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <Fieldset.Root size='lg' maxW='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap='4' w='full'>
          <Fieldset.Content>
            <Controller
              control={control}
              name='email'
              rules={emailValidation}
              render={({ field }) => (
                <Field label='Email' invalid={!!errors.email} errorText={errors.email?.message}>
                  <Input {...field} />
                </Field>
              )}
            />
          </Fieldset.Content>
          <Fieldset.Content>
            <Controller
              control={control}
              name='password'
              rules={passwordValidation}
              render={({ field }) => (
                <Field label='Password' invalid={!!errors.password} errorText={errors.password?.message}>
                  <PasswordInput {...field} />
                </Field>
              )}
            />
          </Fieldset.Content>
        </Stack>
      </form>
    </Fieldset.Root>
  );
});

export { LoginUserForm };
