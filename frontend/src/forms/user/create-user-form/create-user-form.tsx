import { CreateUser, LoginUserRequest } from '@/common/types/types';
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Fieldset, Input, Stack } from '@chakra-ui/react';
import { useImperativeHandle, forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { usernameValidation, emailValidation, passwordValidation } from '@/common/validation-rules/validation-rules';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user.store';
import { userApi } from '@/api/api';
import { useNavigate } from 'react-router';
import { Page } from '@/common/enums/enums';

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

  const setUser = useUserStore(state => state.setUser);

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (loginUser: LoginUserRequest) => userApi.loginUser(loginUser),
    onSuccess: data => {
      setUser(data);
      navigate(Page.Dashboard);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (newUser: CreateUser) => userApi.createUser(newUser),
    onSuccess: (_, variables) => {
      loginMutation.mutate({
        email: variables.email,
        password: variables.password,
      });
    },
  });

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit(onSubmit)();
    },
  }));

  const onSubmit: SubmitHandler<CreateUser> = data => {
    registerMutation.mutate(data);
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
