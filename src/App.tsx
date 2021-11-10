import './App.css'
import RouterController from './components/RouterController'
import NavBar from './components/NavBar'
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <Box p={4} display="flex" flexDir="row" justifyContent="center" alignContent="center">
        <RouterController />
      </Box>
    </div>
  )
}

export default App
