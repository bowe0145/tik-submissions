import { Stack, Box } from '@chakra-ui/react'
import CalendarContainer from '../components/CalendarContainer'
import DateEditor from '../features/date-editor/DateEditor'

const Home = () => {
  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      gridGap={4}
      width="container.lg"
    >
      <CalendarContainer />
      <DateEditor />
    </Box>
  )
}

export default Home
