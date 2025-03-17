import { Clipboard as ChakraClipboard, IconButton, Input } from '@chakra-ui/react';
import { InputGroup } from '../ui/input-group';

interface ClipboardProps {
  label: string;
  value: string;
}

const Clipboard = ({ label, value }: ClipboardProps) => {
  const ClipboardIconButton = () => {
    return (
      <ChakraClipboard.Trigger asChild>
        <IconButton variant='surface' size='xs' me='-2'>
          <ChakraClipboard.Indicator />
        </IconButton>
      </ChakraClipboard.Trigger>
    );
  };

  return (
    <ChakraClipboard.Root value={value}>
      <ChakraClipboard.Label>{label}</ChakraClipboard.Label>
      <InputGroup w='100%' endElement={<ClipboardIconButton />}>
        <ChakraClipboard.Input asChild>
          <Input />
        </ChakraClipboard.Input>
      </InputGroup>
    </ChakraClipboard.Root>
  );
};

export { Clipboard };
