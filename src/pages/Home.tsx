import { Center, Stack } from '@chakra-ui/react'
import CalendarContainer from '../components/CalendarContainer'
import { useAuth } from '../features/auth/context/AuthProvider'
import LoginContainer from '../features/auth/LoginContainer'
import DateEditor from '../features/date-editor/DateEditor'

const Home = () => {
  const { user } = useAuth()
  return (
    <Center>
      {user !== null && user !== undefined ? (
        <Stack>
          {/* <ProfileBox /> */}
          <CalendarContainer />
          <DateEditor />
        </Stack>
      ) : (
        <LoginContainer />
      )}
    </Center>
  )
}

export default Home
