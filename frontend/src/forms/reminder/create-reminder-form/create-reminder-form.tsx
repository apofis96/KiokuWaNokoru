import { Button, Fieldset, Input, Stack, Field, NativeSelectField, NativeSelectRoot } from '@chakra-ui/react';

const CreateReminderForm = () => {
  const selectItems = ['United Kingdom (UK)', 'Canada (CA)', 'United States (US)'];
  const selectOptions = selectItems.map(item => <option key={item}>{item}</option>);

  return (
    <Fieldset.Root size='lg' maxW='md'>
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>Please provide your contact details below.</Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input name='name' />
        </Field.Root>

        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input name='email' type='email' />
        </Field.Root>

        <Field.Root>
          <Field.Label>Country</Field.Label>
          <NativeSelectRoot>
            <NativeSelectField name='country'>{selectOptions}</NativeSelectField>
          </NativeSelectRoot>
        </Field.Root>
      </Fieldset.Content>

      <Button type='submit' alignSelf='flex-start'>
        Submit
      </Button>
    </Fieldset.Root>
  );
};

export { CreateReminderForm };
