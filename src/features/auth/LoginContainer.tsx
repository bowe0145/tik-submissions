import { Box, Center } from '@chakra-ui/react'
import { useAuth } from './context/AuthProvider'
import Logout from './core/Logout'
import LoginRegisterContainer from './core/LoginRegisterContainer'

const LoginContainer = () => {
  const { user } = useAuth()

  return (
    <Box>
      <Box width="md">{user !== null ? <Logout /> : <LoginRegisterContainer />}</Box>
    </Box>
  )
}

export default LoginContainer
