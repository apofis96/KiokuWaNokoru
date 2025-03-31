import { AbsoluteCenter, Button, Card, Spinner } from '@chakra-ui/react';
import { useRef } from 'react';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { LoginUserForm } from '@/forms/user/login-user-form/login-user-form';
import { NavLink } from 'react-router';
import { Page } from '@/common/enums/enums';
import { Link } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/api/api';
import { useUserStore } from '@/stores/user.store';
import { useNavigate } from 'react-router';
import { LoginUserRequest } from '@/common/types/types';
import { useHeaderStore } from '@/stores/header.store';

const LoginPage = () => {
  const setNavigation = useHeaderStore(state => state.setNavigation);
  setNavigation('Login');

  const formRef = useRef<FormRef>(null);

  const setUser = useUserStore(state => state.setUser);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (loginUser: LoginUserRequest) => userApi.loginUser(loginUser),
    onSuccess: data => {
      setUser(data);
      navigate(Page.Dashboard);
    },
  });
  const onSubmit = (loginUser: LoginUserRequest) => mutation.mutate(loginUser);

  return (
    <AbsoluteCenter axis='both'>
      <Card.Root w='lg'>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
          <Card.Description>
            Don't have an account?{' '}
            <Link asChild>
              <NavLink to={Page.Register}>Sign up</NavLink>
            </Link>
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <LoginUserForm onSubmit={onSubmit} ref={formRef} />
        </Card.Body>
        <Card.Footer justifyContent='flex-end'>
          <Button w='10em' variant='outline' disabled>
            Reset password
          </Button>
          <Button w='10em' variant='solid' disabled={mutation.isPending} onClick={() => formRef.current?.submit()}>
            {mutation.isPending ? <Spinner /> : 'Sign in'}
          </Button>
        </Card.Footer>
      </Card.Root>
    </AbsoluteCenter>
  );
};

export { LoginPage };
