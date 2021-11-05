import { createContext, useState, FC, useContext } from 'react'

type DateEditorContextType = {
  date: Date | null
  setDate: (date: Date | null) => void

  isSickDay: boolean
  setIsSickDay: (isSickDay: boolean) => void

  isHoliday: boolean
  setIsHoliday: (isHoliday: boolean) => void

  isWeekend: boolean
  setIsWeekend: (isWeekend: boolean) => void

  isWorkDay: boolean
  setIsWorkDay: (isWorkDay: boolean) => void

  isVacation: boolean
  setIsVacation: (isVacation: boolean) => void

  hours: number
  setHours: (hours: number) => void

  notes: string
  setNotes: (notes: string) => void
}

export const DateEditorContext = createContext<DateEditorContextType>({
  date: null,
  setDate: () => {},

  isSickDay: false,
  setIsSickDay: () => {},

  isHoliday: false,
  setIsHoliday: () => {},

  isWeekend: false,
  setIsWeekend: () => {},

  isWorkDay: false,
  setIsWorkDay: () => {},

  isVacation: false,
  setIsVacation: () => {},

  hours: 0,
  setHours: () => {},

  notes: '',
  setNotes: () => {}
})

export const useDateEditor = () => useContext(DateEditorContext)

const DateEditorProvider: FC = ({ children }) => {
  const [date, setDate] = useState<Date | null>(null)
  const [isSickDay, setIsSickDay] = useState<boolean>(false)
  const [isHoliday, setIsHoliday] = useState<boolean>(false)
  const [isWeekend, setIsWeekend] = useState<boolean>(false)
  const [isWorkDay, setIsWorkDay] = useState<boolean>(false)
  const [isVacation, setIsVacation] = useState<boolean>(false)
  const [hours, setHours] = useState<number>(0)
  const [notes, setNotes] = useState<string>('')

  const _setDate = (date: Date | null) => {
    setDate(date)
  }

  const _setIsSickDay = (isSickDay: boolean) => {
    setIsSickDay(isSickDay)

    if (isSickDay) {
      setHours(0)
      setIsHoliday(false)
      setIsWeekend(false)
      setIsWorkDay(false)
      setIsVacation(false)
    }
  }

  // This shouldn't be necessary, but it's here for now.
  const _setIsHoliday = (isHoliday: boolean) => {
    setIsHoliday(isHoliday)

    if (isHoliday) {
      setIsSickDay(false)
      setIsWeekend(false)
      setIsWorkDay(false)
      setIsVacation(false)
    }
  }

  // This shouldn't be needed, but it's here just in case
  const _setIsWeekend = (isWeekend: boolean) => {
    setIsWeekend(isWeekend)

    if (isWeekend) {
      setIsSickDay(false)
      setIsHoliday(false)
      setIsWorkDay(false)
      setIsVacation(false)
    }
  }

  const _setIsWorkDay = (isWorkDay: boolean) => {
    setIsWorkDay(isWorkDay)

    if (isWorkDay) {
      setIsSickDay(false)
      setIsHoliday(false)
      setIsWeekend(false)
      setIsVacation(false)
    }
  }

  const _setIsVacation = (isVacation: boolean) => {
    setIsVacation(isVacation)

    if (isVacation) {
      setHours(0)
      setIsSickDay(false)
      setIsHoliday(false)
      setIsWeekend(false)
      setIsWorkDay(false)
    }
  }

  const _setHours = (hours: number) => {
    setHours(hours)

    if (hours === 0) {
      setIsWorkDay(false)
    } else {
      setIsWorkDay(true)
    }
  }

  const _setNotes = (notes: string) => {
    setNotes(notes)
  }

  return (
    <DateEditorContext.Provider
      value={{
        date,
        setDate: _setDate,

        isSickDay,
        setIsSickDay: _setIsSickDay,

        isHoliday,
        setIsHoliday: _setIsHoliday,

        isWeekend,
        setIsWeekend: _setIsWeekend,

        isWorkDay,
        setIsWorkDay: _setIsWorkDay,

        isVacation,
        setIsVacation: _setIsVacation,

        hours,
        setHours: _setHours,

        notes,
        setNotes: _setNotes
      }}
    >
      {children}
    </DateEditorContext.Provider>
  )
}

export default DateEditorProvider
