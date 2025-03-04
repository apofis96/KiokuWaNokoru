import { CreateUser } from '@/common/types/types';
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Fieldset, Input, Stack } from '@chakra-ui/react';
import { useImperativeHandle, forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { usernameValidation, emailValidation, passwordValidation } from '@/common/validation-rules/validation-rules';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/api/api';

const CreateUserForm = forwardRef<FormRef>((_, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (newUser: CreateUser) => userApi.createUser(newUser),
    onSuccess: data => {
      alert('User created');
      console.log(data);
    },
  });

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit(onSubmit)();
    },
  }));

  const onSubmit: SubmitHandler<CreateUser> = data => {
    mutation.mutate(data);
  };

  return (
    <Fieldset.Root size='lg' maxW='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap='4' w='full'>
          <Fieldset.Content>
            <Controller
              control={control}
              name='username'
              rules={usernameValidation}
              render={({ field }) => (
                <Field label='Username' invalid={!!errors.username} errorText={errors.username?.message}>
                  <Input {...field} />
                </Field>
              )}
            />
          </Fieldset.Content>
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

export { CreateUserForm };
