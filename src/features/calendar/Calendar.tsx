import { Grid, Box, GridItem } from '@chakra-ui/react'
import {
  endOfISOWeek,
  endOfMonth,
  startOfDay,
  startOfISOWeek,
  startOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay
} from 'date-fns'
import { useState, useEffect } from 'react'
import { useCalendar } from './context/CalendarProvider'
import WeekDayList from './core/WeekDayList'
import DateItem from './core/DateItem'
import NavigationBar from './NavigationBar'
import ExtraData from './core/ExtraData'
import { ExtraDataType } from './types'

const Calendar = ({
  extraData,
  extraDataContainer
}: {
  extraData?: ExtraDataType[]
  extraDataContainer?: ({ date, value }) => JSX.Element
}) => {
  const { calendarDate, selectedDate, SelectDate } = useCalendar()
  const [dates, setDates] = useState<Date[]>([])

  useEffect(() => {
    const start = startOfDay(startOfISOWeek(startOfMonth(calendarDate)))
    const end = startOfDay(endOfISOWeek(endOfMonth(calendarDate)))

    setDates(eachDayOfInterval({ start, end }))
  }, [calendarDate])

  const _SelectDate = (date: Date) => {
    if (date !== selectedDate) {
      SelectDate(date)
    } else {
      SelectDate(null)
    }
  }

  return (
    <Box m="2" p="2" userSelect="none">
      <Grid
        templateColumns="repeat(7, minmax(0, 1fr))"
        templateRows="1fr 0.4fr repeat(6, minmax(0, 1fr))"
        gap="2"
        textAlign="center"
      >
        {/* <GridItem colSpan={7}>
          <NavigationBar />
        </GridItem> */}
        <GridItem colSpan={7}>
          <WeekDayList />
        </GridItem>
        {dates.map((item: Date, idx: number) => {
          const isInMonth = isSameMonth(calendarDate, item)
          let isSelected = false
          if (selectedDate !== null) {
            isSelected = isSameDay(item, selectedDate)
          }
          let itemData: ExtraDataType | undefined = undefined
          if (extraData !== null && extraData !== undefined && extraData.length > 0) {
            itemData = extraData.find(extraDataItem =>
              isSameDay(new Date(extraDataItem.date), item)
            )
          }

          return (
            <DateItem
              isSelected={isSelected}
              isInMonth={isInMonth}
              date={item}
              onSelect={() => _SelectDate(item)}
              key={idx.toString()}
              extraData={itemData}
              Container={extraDataContainer}
            />
          )
        })}
      </Grid>
    </Box>
  )
}

export default Calendar
