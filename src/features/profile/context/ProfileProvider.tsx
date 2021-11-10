import { createContext, useContext, useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { Profile } from '../../../model/Profile'

type ProfileContextType = {
  firstName: string
  lastName: string
  email: string
  phone: string
  updateProfile: (profile: any) => void

  isLoadingProfile: boolean
}

export const ProfileContext = createContext<ProfileContextType>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  updateProfile: () => {},

  isLoadingProfile: false
})

export const useProfile = () => useContext(ProfileContext)

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)

  useEffect(() => {
    const getProfile = async () => {
      setIsLoadingProfile(true)
      try {
        const profile = await Profile.find()
        console.log(`getProfile in ProfileProvider`, profile)
        // if (profile) {
        //   setFirstName(profile.firstName)
        //   setLastName(profile.lastName)
        //   setEmail(profile.email)
        //   setPhone(profile.phone)
        // }
      } catch (e) {
        console.log(`error in ProfileProvider`, e)
      } finally {
        setIsLoadingProfile(false)
      }
    }

    getProfile()
  }, [])

  const _UpdateProfile = async (profile: any) => {
    console.log('Updating profile')
    try {
      setIsLoadingProfile(true)
      const updatedProfile = await Profile.update(profile)

      const newProfile = await Profile.find()
      console.log(`getProfile in ProfileProvider`, newProfile)
      if (newProfile) {
        setFirstName(newProfile.firstName)
        setLastName(newProfile.lastName)
        setEmail(newProfile.email)
        setPhone(newProfile.phone)
      }
    } catch (e) {
      console.log(`_UpdateProfile in ProfileProvider`, e)
    } finally {
      setIsLoadingProfile(false)
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        firstName,
        lastName,
        email,
        phone,
        updateProfile: _UpdateProfile,
        isLoadingProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider
