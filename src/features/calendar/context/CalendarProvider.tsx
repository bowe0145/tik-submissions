import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  startOfDay,
  subDays,
  subMonths,
  subWeeks,
  subYears
} from 'date-fns'
import { createContext, useState, useContext } from 'react'

type CalendarContextType = {
  calendarDate: Date // Date the calendar will use for navigation
  selectedDate: Date | null // Date the calendar will use for selection
  Refresh: () => void

  SelectDate: (date: Date | null) => void

  NextDate: () => void
  NextWeek: () => void
  NextMonth: () => void
  NextYear: () => void

  PrevDate: () => void
  PrevWeek: () => void
  PrevMonth: () => void
  PrevYear: () => void
}

export const CalendarContext = createContext<CalendarContextType>({
  calendarDate: new Date(),
  selectedDate: null,

  Refresh: () => {},

  SelectDate: date => {},

  NextDate: () => {},
  NextWeek: () => {},
  NextMonth: () => {},
  NextYear: () => {},

  PrevDate: () => {},
  PrevWeek: () => {},
  PrevMonth: () => {},
  PrevYear: () => {}
})

export const useCalendar = () => useContext(CalendarContext)

const CalendarProvider = ({ children }: { children: any }) => {
  const [calendarDate, setCalendarDate] = useState<Date>(startOfDay(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const Refresh = () => setCalendarDate(startOfDay(new Date()))

  const SelectDate = (date: Date | null) => setSelectedDate(date)

  const NextDate = () => setCalendarDate(c => startOfDay(addDays(c, 1)))
  const NextWeek = () => setCalendarDate(c => startOfDay(addWeeks(c, 1)))
  const NextMonth = () => setCalendarDate(c => startOfDay(addMonths(c, 1)))
  const NextYear = () => setCalendarDate(c => startOfDay(addYears(c, 1)))

  const PrevDate = () => setCalendarDate(c => startOfDay(subDays(c, 1)))
  const PrevWeek = () => setCalendarDate(c => startOfDay(subWeeks(c, 1)))
  const PrevMonth = () => setCalendarDate(c => startOfDay(subMonths(c, 1)))
  const PrevYear = () => setCalendarDate(c => startOfDay(subYears(c, 1)))

  return (
    <CalendarContext.Provider
      value={{
        calendarDate,
        selectedDate,
        SelectDate,
        Refresh,
        NextDate,
        NextWeek,
        NextMonth,
        NextYear,
        PrevDate,
        PrevWeek,
        PrevMonth,
        PrevYear
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarProvider
