import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../features/auth/context/AuthProvider'
import { Home, Login, Profile } from '../pages'
import NotFound from '../pages/NotFound'

// Display the Login page if not authenticated
const RequireAuth = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  } else {
    return children
  }
}

const RouterController = () => (
  <Routes>
    <Route
      path="/"
      element={
        <RequireAuth>
          <Home />
        </RequireAuth>
      }
    />
    <Route
      path="/profile"
      element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      }
    />
    <Route path="*" element={<NotFound />} />
    {/* <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile" component={Profile} />
    <Route path="/admin" component={Admin} /> */}
  </Routes>
)

export default RouterController
