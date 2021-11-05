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

  useEffect(() => {
    const updateUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        console.log(`updateUser`, user)
        setUser(user)
      } catch (e) {
        console.log(e)
      }
    }

    Hub.listen('auth', updateUser)

    updateUser()

    return () => Hub.remove('auth', updateUser)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await Auth.signIn(email, password)
      setUser(await Auth.currentAuthenticatedUser())
      Hub.dispatch('auth', { event: 'signIn', data: { user } })
    } catch (e: any) {
      setError(e?.message)
    }
    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)
    try {
      await Auth.signOut()
      setUser(null)
      Hub.dispatch('auth', { event: 'signOut', data: {} })
    } catch (e: any) {
      setError(e?.message)
    }
    setLoading(false)
  }

  const register = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email
        }
      })

      console.log(`in authprovider`, response)

      return response
    } catch (e: any) {
      setError(e?.message)
    }
    setLoading(false)
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
