import {
  Text,
  Box,
  Input,
  Center,
  FormControl,
  FormLabel,
  Switch,
  Button,
  Stack,
  useToast
} from '@chakra-ui/react'
import { addDays } from 'date-fns'
import { BeatLoader } from 'react-spinners'
import { useCalendar } from '../calendar/context/CalendarProvider'
import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { DateEditorForm } from './core'
import { useDateEditor } from './context/DateEditorProvider'
import { Day } from '../../model/Day'

const DateEditor = () => {
  const { calendarDate, NextDate, selectedDate, SelectDate } = useCalendar()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { date, setDate, hours, isSickDay, isVacation } = useDateEditor()

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate)
    }
  }, [selectedDate])

  const toast = useToast()

  const SubmitDay = async () => {
    setIsSubmitting(true)
    // Get the user's token from aws-amplify
    // const token = await Auth.currentSession()
    // console.log(token.getIdToken().getJwtToken())

    // const url = 'https://pzm80umfn2.execute-api.us-east-1.amazonaws.com/dev/days'
    // const method = 'POST'

    // // Create the body of the request
    // const body = {
    //   date: selectedDate,
    //   hours: hours,
    //   isSick: isSickDay,
    //   isVacation: isVacation,
    //   notes: '',
    //   submission: ''
    // }

    // // Create the headers of the request with the token in the Authorization header
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `${token.getIdToken().getJwtToken()}`
    // }

    // // Send the request
    // const response = await fetch(url, {
    //   method: method,
    //   headers: headers,
    //   body: JSON.stringify(body)
    // })

    // // Get the response
    // const data = await response.json()

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

  const FetchAllDays = async () => {
    // Get the user's token from aws-amplify
    const token = await Auth.currentSession()
    console.log(token.getIdToken().getJwtToken())

    const url = 'https://pzm80umfn2.execute-api.us-east-1.amazonaws.com/dev/days'
    const method = 'GET'

    // Create the headers of the request with the token in the Authorization header
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token.getIdToken().getJwtToken()}`
    }

    // Send the request
    const response = await fetch(url, {
      method: method,
      headers: headers
    })

    // Get the response
    const data = await response.json()

    // Check if the response was successful
    if (response.ok) {
      console.log(data)
    } else {
      console.log(data)
    }
  }

  const GetSpecificDate = async () => {
    // Get the user's token from aws-amplify
    const token = await Auth.currentSession()

    const url = `https://pzm80umfn2.execute-api.us-east-1.amazonaws.com/dev/days/${+new Date()}`
    const method = 'GET'

    // Create the headers of the request with the token in the Authorization header
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token.getIdToken().getJwtToken()}`
    }

    // Send the request
    const response = await fetch(url, {
      method: method,
      headers: headers
    })

    // Get the response
    const data = await response.json()

    // Check if the response was successful
    if (response.ok) {
      console.log(data)
    } else {
      console.log(data)
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
