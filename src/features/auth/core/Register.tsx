import { Box, Text, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { Auth, Hub } from 'aws-amplify'
import { useAuth } from '../context/AuthProvider'
import { useEffect, useState } from 'react'
import VerifyEmail from './VerifyEmail'

const Register = () => {
  // Register form for aws-amplify using aws cognito
  const toast = useToast()
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const [username, setUsername] = useState<any>(null)

  /*
  useEffect(() => {
    const updateUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        console.log(`updateUser`, user)
        setUser(user)
      } catch (e) {
        console.log(e)
      }
    }

    Hub.listen('auth', updateUser)

    updateUser()

    return () => Hub.remove('auth', updateUser)
  }, [])
*/

  useEffect(() => {
    // Setup a listener for this event Hub.dispatch('auth', { event: 'confirmSignUp', data: { response } })
    const updateConfirmStatus = async (action: any) => {
      console.log(`in listener, data: `, data)
      // Check if the event is 'confirmSignUp'
      if (action?.payload?.event === 'confirmSignUp') {
        // Check if the response is successful
        if (action?.payload?.data?.response === 'SUCCESS') {
          toast({
            title: 'Success',
            description: 'Account created successfully',
            status: 'success',
            variant: 'solid',
            duration: 5000,
            isClosable: true
          })
          // Set the data to the response
          setData(action.payload.data.response)
          setUsername(null)
        } else {
          // Set the error to the response
          setError(action.payload.data.response)
        }
      }
    }

    Hub.listen('auth', updateConfirmStatus)

    return () => Hub.remove('auth', updateConfirmStatus)
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const user = await register(email, password)
      //   console.log(user)

      if (user?.userConfirmed === false) {
        setData(user?.codeDeliveryDetails)
        setUsername(user?.user?.username)
      }
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (data && username) {
    return <VerifyEmail {...data} username={username} />
  }

  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <Input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </FormControl>
      <Button variantColor="teal" onClick={handleSubmit}>
        Register
      </Button>
      {error && <Text>{error}</Text>}
    </Box>
  )
}

export default Register
