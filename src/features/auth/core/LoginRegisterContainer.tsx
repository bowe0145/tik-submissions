import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Box } from '@chakra-ui/react'
import Login from './Login'
import Register from './Register'
import { useState, useEffect } from 'react'
import { Hub } from 'aws-amplify'

const LoginRegisterContainer = () => {
  // Have 2 tabs, 1 for the login form, 1 for register form
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = index => {
    setTabIndex(index)
  }

  // Setup a listener to change the tab back to login when the confirm user signup is done
  useEffect(() => {
    const ConfirmUserListener = async action => {
      if (action?.payload?.event === 'confirmSignUp') {
        // Check if the response is successful
        if (action?.payload?.data?.response === 'SUCCESS') {
          setTabIndex(0)
        } else {
          // Set the error to the response
          console.log(action.payload.data.response)
        }
      }
    }

    Hub.listen('auth', ConfirmUserListener)

    return () => Hub.remove('auth', ConfirmUserListener)
  }, [])

  return (
    <Box display="flex" justifyContent="flex-start">
      <Tabs index={tabIndex} onChange={handleTabChange} isFitted>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default LoginRegisterContainer
