import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Calendar, NavigationBar } from '../features/calendar'
import { ExtraDataType } from '../features/calendar/types'
import { useDates } from '../features/dates/context'

const ExtraDataContainer = ({ date, value }) => {
  // Check if the value is a number, or if its 'sick', or if its 'vacation'
  if (Number(value)) {
    if (Number(value) === 8 || Number(value) === 7.5) {
      return <Box bg="green.500" color="white" p="1" rounded="md"></Box>
    } else if (Number(value) > 0) {
      return <Box bg="green.500" />
    } else {
      return <Box />
    }
  } else if (value === 'sick') {
    return <Box bg="red.500" color="white" p="1" rounded="md"></Box>
  } else if (value === 'vacation') {
    return <Box bg="blue.500" color="white" p="1" rounded="md"></Box>
  } else {
    return <Box />
  }
}

type DayType = {
  date: Date
  hours: number
  isVacation: boolean
  isSick: boolean
}

const CalendarContainer = () => {
  const [days, setDays] = useState<ExtraDataType[]>([])
  const { dates } = useDates()

  useEffect(() => {
    // Map the dates to extra data
    if (dates && dates.EntityList && dates.EntityList.length > 0) {
      const extraData = dates.EntityList.map((day: DayType) => {
        if (day.hours > 0) {
          return {
            date: day.date,
            value: day.hours.toString()
          }
        } else if (day.isVacation) {
          return {
            date: day.date,
            value: 'vacation'
          }
        } else if (day.isSick) {
          return {
            date: day.date,
            value: 'sick'
          }
        } else {
          return {
            date: day.date,
            value: ''
          }
        }
      }).filter(item => item.value !== '')

      setDays(extraData)
    }

    // setDays(extraData)
  }, [dates])

  return (
    <Box
      backgroundColor="blackAlpha.400"
      border="1px"
      borderRadius="md"
      borderColor="tik.200"
      width="100%"
    >
      <NavigationBar />
      <Calendar extraData={days} extraDataContainer={ExtraDataContainer} />
    </Box>
  )
}

export default CalendarContainer
