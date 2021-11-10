import { Button, Grid, GridItem } from '@chakra-ui/react'
import { NavLink as RouterLink, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/context/AuthProvider'
import LogoutButton from '../features/auth/core/LogoutButton'

const NavBar = () => {
  const { user } = useAuth()
  const { pathname } = useLocation()

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
      <GridItem
        rowStart={1}
        colStart={1}
        justifyContent="flex-start"
        alignContent="center"
        alignItems="flex-start"
      >
        <Button variant="link" w="128px">
          <a href="https://www.mgisinc.ca">
            <img src="mgis.png" width="128px" alt="MGIS Logo" />
          </a>
        </Button>
      </GridItem>
      <GridItem
        display="flex"
        flexDir="row"
        justifyContent="flex-start"
        gridGap="2"
        alignContent="center"
        alignItems="flex-end"
        rowStart={1}
        colSpan={5}
        colStart={4}
      >
        <RouterLink to="/">
          <Button
            p={2}
            _focus={{ outline: 'none' }}
            variant={pathname === '/' ? 'outline' : 'link'}
          >
            Home
          </Button>
        </RouterLink>
        <RouterLink to="/profile">
          <Button
            p={2}
            _focus={{ outline: 'none' }}
            variant={pathname === '/profile' ? 'outline' : 'link'}
          >
            Profile
          </Button>
        </RouterLink>
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

export default NavBar
