import { useContext, createContext, useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { useToast } from '@chakra-ui/toast'

type AuthContextType = {
  user: any | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string) => Promise<any>
  confirmSignUp: (username: string, code: string) => Promise<void>

  loading: boolean

  error: string | null
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  confirmSignUp: async () => {},
  loading: false,
  error: null
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const toast = useToast()

  useEffect(() => {
    // Get the current user
    const GetUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch (e) {
        setUser(null)
      }
    }

    const AuthListener = async action => {
      const { event, data } = action.payload
      switch (event) {
        //
        case 'signIn':
          setUser(data)
          toast({
            title: 'Successfully Logged In',
            description: `You are now logged in.`,
            position: 'bottom',
            status: 'success',
            variant: 'subtle'
          })
          break
        case 'signOut':
          setUser(null)
          break
        case 'signUp':
          // Not much to do here
          // GetUser()
          break
        case 'confirmSignUp':
          // GetUser()
          break
        case 'signIn_failure':
          setError(data)
          break
        case 'signUp_failure':
          setError(data)
          break
        default:
          break
      }
    }

    GetUser()

    // Subscribe to the user's sign in, sign out, and confirm sign up events
    Hub.listen('auth', AuthListener)

    return () => Hub.remove('auth', AuthListener)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await Auth.signIn(email, password)
      Hub.dispatch('auth', { event: 'signIn', data: { response } })
    } catch (e: any) {
      setError(e?.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await Auth.signOut()
      Hub.dispatch('auth', {
        event: 'signOut',
        data: {
          message: 'User has been logged out'
        }
      })
    } catch (e: any) {
      setError(e?.message)
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email
        }
      })
      // Dispatch the register event in the Hub
      Hub.dispatch('auth', { event: 'signUp', data: { user: response } })

      return response
    } catch (e: any) {
      setError(e?.message)
    } finally {
      setLoading(false)
    }
  }

  // Confirm the signup
  const confirmSignUp = async (username: string, code: string) => {
    setLoading(true)

    try {
      const response = await Auth.confirmSignUp(username, code)

      Hub.dispatch('auth', { event: 'confirmSignUp', data: { response } })

      // SUCCESS
      return response
    } catch (e: any) {
      setError(e?.message)
    }
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        confirmSignUp,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
