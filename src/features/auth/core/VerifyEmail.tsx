import { Button, Text, FormControl, FormLabel, Box, HStack, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useAuth } from '../context/AuthProvider'

type VerifyEmailProps = {
  username: string
  AttributeName: string
  DeliveryMedium: 'SMS' | 'EMAIL'
  Destination: string
}

const VerifyEmail = ({
  username,
  AttributeName,
  DeliveryMedium,
  Destination
}: VerifyEmailProps) => {
  const { confirmSignUp, loading } = useAuth()
  const [verificationCode, setVerificationCode] = useState('')
  const DidntReceiveMessage = `Didn't receive a code?`

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      // confirmSignUp
      await confirmSignUp(username, verificationCode)
    } catch (error) {
      console.log(error)
    }
  }

  // Form the confirm account
  return (
    <Box>
      <Text>{`We have sent a code by ${
        DeliveryMedium === 'EMAIL' ? 'Email' : 'SMS'
      } to ${Destination}. Enter it below to confirm your account.`}</Text>
      <FormControl>
        <FormLabel htmlFor="verificationCode">Verification Code</FormLabel>
        <Input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={e => setVerificationCode(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit}>Confirm</Button>
      <HStack>
        <Text>Didn't receive a code?</Text>
        <Button variant="link">Resend it</Button>
      </HStack>
    </Box>
  )
}

export default VerifyEmail
