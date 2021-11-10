import { Text, Box, Center, Button, useToast } from '@chakra-ui/react'
import { addDays } from 'date-fns'
import { BeatLoader } from 'react-spinners'
import { useCalendar } from '../calendar/context/CalendarProvider'
import { useEffect, useState } from 'react'
import { DateEditorForm } from './core'
import { useDateEditor } from './context/DateEditorProvider'
import { Day } from '../../model/Day'

const DateEditor = () => {
  const { selectedDate, SelectDate } = useCalendar()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setDate, hours, isSickDay, isVacation } = useDateEditor()

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

  if (selectedDate === null) {
    return null
  }

  return (
    <Center>
      <Box border="1px" borderRadius="md" width="sm">
        <Text>{selectedDate?.toLocaleDateString()}</Text>
        {/* <Box
          backgroundColor="whiteAlpha.400"
          display="flex"
          flexDir="column"
          alignContent="center"
          p={2}
        >
          <Text>Hacker buttons</Text>
          <Button variant="outline" onClick={SubmitDay}>
            Submit
          </Button>
          <Button variant="outline" onClick={FetchAllDays}>
            Fetch All Days
          </Button>
          <Button variant="outline" onClick={GetSpecificDate}>
            Get Specific Date
          </Button>
        </Box> */}

        <DateEditorForm />

        <Button
          onClick={SubmitDay}
          isLoading={isSubmitting}
          spinner={<BeatLoader size={8} color="teal" />}
        >
          Submit Date
        </Button>
      </Box>
    </Center>
  )
}

export default DateEditor
