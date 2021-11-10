import { Button } from '@chakra-ui/react'
import { useAuth } from '../context/AuthProvider'

const LogoutButton = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    logout()
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
