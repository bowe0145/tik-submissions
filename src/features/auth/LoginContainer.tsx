import { Box, Center } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Login from './core/Login'
import { useAuth } from './context/AuthProvider'
import { Auth, Hub } from 'aws-amplify'
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
