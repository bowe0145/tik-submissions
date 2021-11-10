import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Auth, Hub } from 'aws-amplify'
import { Calendar, NavigationBar } from './features/calendar'
import { Box, Center, Stack, Spacer, HStack, Text, Button, Grid, GridItem } from '@chakra-ui/react'
import DateEditor from './features/date-editor/DateEditor'
import { Day } from './model/Day'
import CalendarContainer from './components/CalendarContainer'
import LoginContainer from './features/auth/LoginContainer'
import ProfileBox from './features/profile/ProfileBox'
import { useAuth } from './features/auth/context/AuthProvider'
import AuthStatusBar from './features/auth/core/AuthStatusBar'
import LogoutButton from './features/auth/core/LogoutButton'

const NavBar = () => {
  const { user } = useAuth()

  // TODO: Use grid instead of flex
  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      justifyContent="center"
      alignContent="center"
      spacing={4}
      borderBottomColor="teal.800"
      borderBottomWidth="thin"
      p="2"
    >
      <GridItem rowStart={1} colStart={1} colSpan={4}>
        <img src="mgis.png" width="128px" />
      </GridItem>
      <GridItem
        display="flex"
        flexDir="row"
        justifyContent="flex-start"
        gridGap="2"
        alignContent="center"
        rowStart={1}
        colSpan={5}
        colStart={4}
        p={2}
      >
        <Button p={2} variant="link">
          Profile
        </Button>

        <Button p={2} variant="link">
          Timesheets
        </Button>
      </GridItem>
      <GridItem
        rowStart={1}
        colStart={10}
        colSpan={1}
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        {user !== null && user !== undefined ? <LogoutButton /> : null}
      </GridItem>
    </Grid>
  )
}

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <Center>
        {user !== null && user !== undefined ? (
          <Stack>
            {/* <ProfileBox /> */}
            <CalendarContainer />
            <DateEditor />
          </Stack>
        ) : (
          <LoginContainer />
        )}
      </Center>
    </div>
  )
}

export default App
