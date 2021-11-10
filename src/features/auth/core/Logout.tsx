import { Box, Text, Button } from '@chakra-ui/react'
import { useState, FormEvent, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { useAuth } from '../context/AuthProvider'

const Logout = () => {
  const { user, logout, loading } = useAuth()

  const handleLogout = async (event: FormEvent) => {
    event.preventDefault()
    await logout()
  }

  return (
    <Box>
      <Text>You are currently logged in as {user?.attributes?.email}</Text>
      <Button onClick={handleLogout} disabled={loading}>
        Logout
      </Button>
    </Box>
  )
}

export default Logout
