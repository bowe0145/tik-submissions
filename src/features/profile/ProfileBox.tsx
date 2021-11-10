import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement
} from '@chakra-ui/react'
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'
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

  useEffect(() => {
    if (user) {
      setFormFullName(user.attributes.name)
      setFormEmail(user.attributes.email)
      setFormPhone(user.attributes.phone_number)
    }
  }, [user])

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

  return (
    <Box width="xl" height="md" display="flex" flexDir="column" gridGap={4}>
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
      <FormControl>
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
            disabled={true}
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
    </Box>
  )
}

export default ProfileBox
