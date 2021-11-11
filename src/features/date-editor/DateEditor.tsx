import {
  Text,
  Box,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Switch
} from '@chakra-ui/react'
import { addDays, format } from 'date-fns'
import { BeatLoader } from 'react-spinners'
import { useCalendar } from '../calendar/context/CalendarProvider'
import { useEffect, useState } from 'react'
import { DateEditorForm } from './core'
import { useDateEditor } from './context/DateEditorProvider'
import { Day } from '../../model/Day'

const FormatDate = ({ date }) => {
  return <Text>{format(date, 'MMMM do, yyyy')}</Text>
}

const DateEditor = () => {
  const { selectedDate, SelectDate } = useCalendar()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setDate, hours, isSickDay, isVacation, setIsSickDay, setIsVacation, setHours } =
    useDateEditor()

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate)
    }
  }, [selectedDate, setDate])

  const toast = useToast()

  const SubmitDay = async () => {
    setIsSubmitting(true)

    const response = await Day.update({
      date: selectedDate,
      hours: hours,
      isSick: isSickDay,
      isVacation: isVacation,
      notes: '',
      submission: ''
    })
    console.log(`response in submit`, response)
    // Check if the response was successful
    if (response?.id) {
      toast({
        title: 'Date submitted',
        description: `Your date has been submitted.
          The next date has been automatically selected for you.`,
        position: 'bottom',
        status: 'success',
        variant: 'subtle'
      })
    } else {
      console.log(response)
    }

    setIsSubmitting(false)

    // Set the calendar date to NextDate
    if (selectedDate) {
      SelectDate(addDays(selectedDate, 1))
    }
  }

  const testChange = e => {
    console.log(e)
    setHours(e.target.value)
  }

  if (selectedDate === null) {
    return null
  }

  return (
    <Box
      border="1px"
      borderRadius="md"
      maxW="container.sm"
      backgroundColor="blackAlpha.400"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignContent="center"
      gridGap={2}
      p={2}
    >
      <FormatDate date={selectedDate} />
      {/* <DateEditorForm /> */}

      <FormControl
        display="flex"
        flexDir="row"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        p={2}
      >
        <FormLabel htmlFor="hours">Hours</FormLabel>
        <Input type="number" id="hours" value={hours} onChange={testChange} />
      </FormControl>

      <Box display="flex" flexDir="row" justifyContent="space-around" alignContent="center" p={2}>
        <FormControl>
          <FormLabel textAlign="center" htmlFor="isSickDay">
            Sick Day
          </FormLabel>
          <Switch
            type="checkbox"
            id="isSickDay"
            checked={!!isSickDay}
            isChecked={!!isSickDay}
            onChange={e => setIsSickDay(e.target.checked)}
          />
        </FormControl>

        <FormControl>
          <FormLabel textAlign="center" htmlFor="isVacationDay">
            Vacation Day
          </FormLabel>
          <Switch
            type="checkbox"
            id="isVacationDay"
            checked={isVacation}
            isChecked={isVacation}
            onChange={e => setIsVacation(e.target.checked)}
          />
        </FormControl>
      </Box>

      <Button
        onClick={SubmitDay}
        isLoading={isSubmitting}
        spinner={<BeatLoader size={8} color="teal" />}
      >
        Submit Date
      </Button>
    </Box>
  )
}

export default DateEditor
