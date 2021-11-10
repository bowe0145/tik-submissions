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
  const [data, setData] = useState<any>(null)
  const [username, setUsername] = useState<any>(null)

  useEffect(() => {
    const updateConfirmStatus = async (action: any) => {
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
          console.log(`error in updateConfirmStatsu`, action?.payload?.data?.response)
          // setError(action.payload.data.response)
        }
      }
    }

    Hub.listen('auth', updateConfirmStatus)

    return () => Hub.remove('auth', updateConfirmStatus)
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const user: any = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email
        }
      })
      //   console.log(user)
      console.log(`user before it`, user)

      if (user?.userConfirmed === false) {
        setData(user?.codeDeliveryDetails)
        setUsername(user?.user?.username)
      }
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      console.log(`breaking error`, err)
      // setError(err?.message ?? err)
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
      <Button color="teal.400" onClick={handleSubmit}>
        Register
      </Button>
    </Box>
  )
}

export default Register
