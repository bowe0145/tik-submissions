import { Box, Button, Center, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <Center>
      <Box
        p={2}
        m={2}
        display="flex"
        flexDir="column"
        gridGap={5}
        justifyContent="center"
        alignContent="center"
      >
        <Text>Error 404</Text>
        <Text>Page Not Found</Text>
        <Link to="/">
          <Button variant="link">Go Home</Button>
        </Link>
      </Box>
    </Center>
  )
}

export default NotFound
