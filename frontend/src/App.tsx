import { Button, HStack } from "@chakra-ui/react"
import { RiArrowRightLine, RiMailLine } from 'react-icons/ri'
import './App.css'

function App() {

  return (
    <>
      <HStack>
        <Button colorPalette="teal" variant="solid">
          <RiMailLine /> Email
        </Button>
        <Button colorPalette="teal" variant="outline">
          Call us <RiArrowRightLine />
        </Button>
      </HStack>
    </>
  )
}

export default App
