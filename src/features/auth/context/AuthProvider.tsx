import { useContext, createContext, useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'

type AuthContextType = {
  user: any | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string) => Promise<any>
  confirmSignUp: (username: string, code: string) => Promise<void>

  loading: boolean

  error: string | null
  clearError: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  confirmSignUp: async () => {},
  loading: false,
  error: null,
  clearError: () => {}
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

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
      console.log(action)
      switch (event) {
        //
        case 'signIn':
          console.log(`received signIn`)
          setUser(data)
          break
        case 'signOut':
          setUser(null)
          break
        case 'signUp':
          console.log(action)
          // Not much to do here
          // GetUser()
          break
        case 'confirmSignUp':
          console.log(action)
          // GetUser()
          break
        case 'signIn_failure':
          setError(data.message)
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

  const _clearError = () => {
    setError(null)
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      await Auth.signIn(email, password)
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
        error,
        clearError: _clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
