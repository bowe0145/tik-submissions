import { Box, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'

const Login = () => {
  const { login, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()

  useEffect(() => {}, [])

  useEffect(() => {
    if (error !== null && error !== undefined) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      clearError()
    }
  }, [error, toast, clearError])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      await login(email, password)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Box p={2}>
      <FormControl>
        <FormLabel htmlFor="email-login">Email</FormLabel>
        <Input
          id="email-login"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password-login">Password</FormLabel>
        <Input
          id="password-login"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>

      <Box p={2}>
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  )
}

export default Login
