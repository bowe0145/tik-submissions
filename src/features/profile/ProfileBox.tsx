import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement
} from '@chakra-ui/react'
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'
import { useProfile } from './context/ProfileProvider'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { Auth } from 'aws-amplify'
import { useAuth } from '../auth/context/AuthProvider'

const ProfileBox = () => {
  const { user } = useAuth()

  const [formFullName, setFormFullName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    const userAttributes = {
      email: formEmail,
      phone_number: formPhone,
      name: formFullName
    }

    try {
      setIsLoading(true)
      await Auth.updateUserAttributes(user, userAttributes)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const SubmitProfile = e => {
    e.preventDefault()
    // updateProfile({
    //   fullName: formFullName,
    //   email: formEmail,
    //   phone: formPhone
    // })
  }

  return (
    <Box width="xl" height="md">
      <Text>Profile </Text>
      <FormControl isRequired>
        <FormLabel htmlFor="fullName">Full Name</FormLabel>
        <InputGroup>
          <Input
            id="fullName"
            placeholder="Full Name"
            value={formFullName}
            onChange={e => setFormFullName(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <InputGroup>
          <InputLeftAddon>
            <InputLeftElement>
              <EmailIcon />
            </InputLeftElement>
          </InputLeftAddon>
          <Input
            id="email"
            value={formEmail}
            onChange={e => setFormEmail(e.target.value)}
            placeholder="Email"
          />
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <InputGroup>
          <InputLeftAddon>
            <InputLeftElement>
              <PhoneIcon />
            </InputLeftElement>
          </InputLeftAddon>
          <Input
            id="phone"
            value={formPhone}
            onChange={e => setFormPhone(e.target.value)}
            placeholder="Phone"
          />
        </InputGroup>
      </FormControl>
      <Button
        isLoading={isLoading}
        spinner={<BeatLoader size={8} color="teal" />}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {user?.attributes?.email !== null &&
      user?.attributes?.email !== undefined &&
      user?.attributes?.email !== '' ? (
        <Text>Email: {user?.attributes?.email}</Text>
      ) : (
        <Text>No email</Text>
      )}
    </Box>
  )
}

export default ProfileBox
