import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Auth } from 'aws-amplify'
import { Calendar, NavigationBar } from './features/calendar'
import { Box, Center, Stack } from '@chakra-ui/react'
import DateEditor from './features/date-editor/DateEditor'
import { Day } from './model/Day'
import CalendarContainer from './components/CalendarContainer'
import LoginContainer from './features/auth/LoginContainer'

function App() {
  const tryLogin = async () => {
    try {
      await Auth.signIn('ryalane2@gmail.com', 'Test123!')
      console.log('Logged in!')
    } catch (e) {
      console.log('Error', e)
    }
  }

  return (
    <div className="App">
      <header>
        <LoginContainer />
        <button onClick={tryLogin}>Try Login</button>
      </header>
      <Center>
        <Stack>
          <CalendarContainer />
          <Box>
            <DateEditor />
          </Box>
        </Stack>
      </Center>
    </div>
  )
}

export default App
