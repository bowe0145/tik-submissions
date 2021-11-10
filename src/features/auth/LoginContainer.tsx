import { Box, Center } from '@chakra-ui/react'
import { useAuth } from './context/AuthProvider'
import Logout from './core/Logout'
import LoginRegisterContainer from './core/LoginRegisterContainer'

const LoginContainer = () => {
  const { user } = useAuth()

  return (
    <Center>
      <Box width="md">{user !== null ? <Logout /> : <LoginRegisterContainer />}</Box>
    </Center>
  )
}

export default LoginContainer
