import { Auth, Hub } from 'aws-amplify'
import { Box, Button, Text, Stack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthProvider'

const AuthStatusBar = () => {
  // If the user is logged in, show the logout button
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const AuthListener = async action => {
      console.log(`AuthListener`, action)
      switch (action.payload.event) {
        case 'signIn':
          setIsLoggedIn(true)
          break
        case 'signOut':
          setIsLoggedIn(false)
          break
        default:
          break
      }
    }

    const CheckAuthStatus = async () => {
      const user = await Auth.currentAuthenticatedUser()
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }

    CheckAuthStatus()
    Hub.listen('auth', AuthListener)

    return () => Hub.remove('auth', AuthListener)
  }, [])

  const handleLogout = async () => {
    logout()
  }

  if (isLoggedIn) {
    return <Button onClick={handleLogout}>Logout</Button>
  }
  return null
}

export default AuthStatusBar
