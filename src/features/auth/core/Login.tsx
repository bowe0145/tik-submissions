import { Box, Text, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useState, FormEvent } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Hub } from 'aws-amplify'

const Login = () => {
  const { user, login, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      await login(email, password)
      Hub.dispatch('auth', { event: 'signIn', data: user })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>

      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}

export default Login
