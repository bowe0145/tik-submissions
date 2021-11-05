import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import CalendarProvider from './features/calendar/context/CalendarProvider'
import DateEditorProvider from './features/date-editor/context/DateEditorProvider'
import DatesProvider from './features/dates/context'
import AuthProvider from './features/auth/context/AuthProvider'

Amplify.configure(config)

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <DatesProvider>
          <CalendarProvider>
            <DateEditorProvider>
              <App />
            </DateEditorProvider>
          </CalendarProvider>
        </DatesProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
