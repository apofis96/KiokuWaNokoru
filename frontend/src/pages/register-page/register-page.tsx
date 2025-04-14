import { AbsoluteCenter, Button, Card } from '@chakra-ui/react';
import { useRef } from 'react';
import { FormRef } from '@/common/interfaces/form-ref.interface';
import { CreateUserForm } from '@/forms/user/create-user-form/create-user-form';
import { useHeader } from '@/common/hooks/hooks';
import { useNavigate } from 'react-router';
import { Page } from '@/common/enums/enums';

const RegisterPage = () => {
  useHeader('Register');
  const navigate = useNavigate();

  const formRef = useRef<FormRef>(null);

  return (
    <AbsoluteCenter axis='both'>
      <Card.Root w='lg'>
        <Card.Header>
          <Card.Title>Sign up</Card.Title>
          <Card.Description>Fill in the form below to create an account</Card.Description>
        </Card.Header>
        <Card.Body>
          <CreateUserForm ref={formRef} />
        </Card.Body>
        <Card.Footer justifyContent='flex-end'>
          <Button variant='outline' onClick={() => navigate(Page.Login)}>
            Cancel
          </Button>
          <Button variant='solid' onClick={() => formRef.current?.submit()}>
            Sign up
          </Button>
        </Card.Footer>
      </Card.Root>
    </AbsoluteCenter>
  );
};

export { RegisterPage };
