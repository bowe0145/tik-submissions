import { Auth, Hub } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useAuth } from '../context/AuthProvider'

const LogoutButton = () => {
  const { user } = useAuth()
  //   const [isLoggedIn, setIsLoggedIn] = useState(false)

  //   useEffect(() => {
  //     const AuthListener = async action => {
  //       switch (action.payload.event) {
  //         case 'signIn':
  //           setIsLoggedIn(true)
  //           break
  //         case 'signOut':
  //           setIsLoggedIn(false)
  //           break
  //         default:
  //           break
  //       }
  //     }

  //     const CheckAuthStatus = async () => {
  //       const user = await Auth.currentAuthenticatedUser()
  //       if (user) {
  //         setIsLoggedIn(true)
  //       } else {
  //         setIsLoggedIn(false)
  //       }
  //     }

  //     CheckAuthStatus()
  //     Hub.listen('auth', AuthListener)

  //     return () => Hub.remove('auth', AuthListener)
  //   }, [])

  const handleLogout = async () => {
    await Auth.signOut()

    // Update the Hub
    Hub.dispatch('auth', {
      event: 'signOut',
      data: {
        message: 'User has been signed out'
      }
    })
  }

  if (user) {
    return (
      <Button variant="outline" p={2} onClick={handleLogout}>
        Logout
      </Button>
    )
  }

  return null
}

export default LogoutButton
