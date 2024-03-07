import { Box, Button, Card, Flex } from '@radix-ui/themes'
import { useState } from 'react'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <Flex width={'100%'} height={'100%'} justify={'center'} align={'center'}>
      <Card>
        <Flex direction={'column'} align={'center'}>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://preactjs.com" target="_blank">
            <img src={preactLogo} className="logo preact" alt="Preact logo" />
          </a>
        </Flex>
        <Flex justify={'center'}><h1>Vite + Preact</h1></Flex>
        <Box className="card">
          <Button onClick={() => setCount(count + 1)}>
            count is {count}
          </Button>
          <p>
            Edit <code>src/app.tsx</code> and save to test HMR
          </p>
        </Box>
        <p className="read-the-docs">
          Click on the Vite and Preact logos to learn more
        </p>
      </Card>
    </Flex>
  )
}
