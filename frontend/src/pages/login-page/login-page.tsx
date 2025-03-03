import { AbsoluteCenter, Button, Card } from '@chakra-ui/react';
import { useRef } from 'react';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { LoginUserForm } from '@/forms/user/login-user-form/login-user-form';

const LoginPage = () => {
  const formRef = useRef<FormRef>(null);

  return (
    <AbsoluteCenter axis='both'>
      <Card.Root w='lg'>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
        </Card.Header>
        <Card.Body>
          <LoginUserForm ref={formRef} />
        </Card.Body>
        <Card.Footer justifyContent='flex-end'>
          <Button variant='outline'>Reset password</Button>
          <Button variant='solid' onClick={() => formRef.current?.submit()}>
            Sign in
          </Button>
        </Card.Footer>
      </Card.Root>
    </AbsoluteCenter>
  );
};

export { LoginPage };
