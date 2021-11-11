import { Button, IconButton, Icon } from '@chakra-ui/react'
import { useAuth } from '../context/AuthProvider'
import { GoSignOut } from 'react-icons/go'

const LogoutButton = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  if (user) {
    // return (
    //   <Button variant="outline" p={2} onClick={handleLogout}>
    //     Logout
    //   </Button>
    // )

    return (
      <IconButton
        variant="ghost"
        aria-label="Logout"
        p={2}
        onClick={handleLogout}
        icon={<Icon as={GoSignOut} />}
      />
    )
  }

  return null
}

export default LogoutButton
