import { Grid, Text } from '@chakra-ui/react'
import {
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday
} from 'date-fns'
import { useEffect, useState } from 'react'

const WeekDayList = () => {
  const [weekDates, setWeekDates] = useState<Date[]>([])

  useEffect(() => {
    let monday = nextMonday(new Date(2021, 1, 4))
    let tuesday = nextTuesday(monday)
    let wednesday = nextWednesday(monday)
    let thursday = nextThursday(monday)
    let friday = nextFriday(monday)
    let saturday = nextSaturday(monday)
    let sunday = nextSunday(monday)

    setWeekDates([monday, tuesday, wednesday, thursday, friday, saturday, sunday])
  }, [])

  return (
    <Grid templateColumns="repeat(7, minmax(0, 1fr))" templateRows="1fr" gap="2" textAlign="center">
      {weekDates.map((item: Date, idx: number) => {
        return (
          <Text>
            <abbr title={item.toLocaleDateString(undefined, { weekday: 'long' })}>
              {item.toLocaleDateString(undefined, { weekday: 'short' })}
            </abbr>
          </Text>
        )
      })}
    </Grid>
  )
}

export default WeekDayList
