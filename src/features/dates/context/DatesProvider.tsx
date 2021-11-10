import { createContext, FC, useContext, useEffect, useRef, useState } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { Day } from '../../../model/Day'
import { useAuth } from '../../auth/context/AuthProvider'

type EntityAdapter = {
  EntityList: any[]
  EntityIds: any[]
}

type DatesContextType = {
  dates: EntityAdapter
  // Fetch all dates
  LoadAllDates: () => void
  isLoadingAllDates: boolean
  // Update locally, silently fetch the date using the timestamp and update the date after
  UpdateDate: (date: any) => void
  isLoadingUpdateDate: boolean

  SubmitDate: (date: any, params: any) => void
  isSubmittingDate: boolean
}

export const DatesContext = createContext<DatesContextType>({
  dates: {
    EntityList: [],
    EntityIds: []
  },
  LoadAllDates: () => {},
  isLoadingAllDates: false,
  UpdateDate: () => {},
  isLoadingUpdateDate: false,
  SubmitDate: () => {},
  isSubmittingDate: false
})

export const useDates = () => useContext(DatesContext)

const DatesContextProvider: FC = props => {
  const { user } = useAuth()

  const [dates, setDates] = useState<EntityAdapter>({
    EntityList: [],
    EntityIds: []
  })
  const [isLoadingAllDates, setIsLoadingAllDates] = useState(false)
  const [isLoadingUpdateDate, setIsLoadingUpdateDate] = useState(false)
  const [isSubmittingDate, setIsSubmittingDate] = useState(false)

  const dateFetchingInterval = useRef<any>(null)

  // Listen for changes in Hub and fetch dates
  useEffect(() => {
    const userListener = async () => {
      try {
        // if (user) {
        // Use Day.findAll to fetch all dates
        setIsLoadingAllDates(true)
        const dates = await Day.findAll()
        setDates({
          EntityList: dates,
          EntityIds: dates.map(date => date.id)
        })
        setIsLoadingAllDates(false)
        // }
      } catch (e) {
        console.log(e)
      }
    }

    Hub.listen('auth', userListener)

    userListener()

    return () => Hub.remove('auth', userListener)
  }, [])

  // Use Day.findAll() to fetch all dates every 10 seconds in a useEffect
  useEffect(() => {
    dateFetchingInterval.current = setInterval(() => {
      console.log('Should fetch if user isnt null', user)
      // if (user) {
      setIsLoadingAllDates(true)
      Day.findAll()
        .then(dates => {
          setDates({
            EntityList: dates,
            EntityIds: dates.map(date => date.id)
          })
          setIsLoadingAllDates(false)
        })
        .catch(err => {
          console.log(err)
          setIsLoadingAllDates(false)
        })
      // }
    }, 1000000)

    const LoadAll = async () => {
      if (user) {
        Day.findAll()
          .then(dates => {
            setDates({
              EntityList: dates,
              EntityIds: dates.map(date => date.id)
            })
          })
          .catch(err => console.log(err))
      }
    }

    LoadAll()

    return () => clearInterval(dateFetchingInterval.current)
  }, [])

  const _LoadAllDates = async () => {
    // Load from the  Day model
    setIsLoadingAllDates(true)
    const data = await Day.findAll()

    setDates({
      EntityList: data.Items,
      EntityIds: data.Items.map(item => item.id)
    })
  }

  const _UpdateDate = async (date: any) => {
    setIsLoadingUpdateDate(true)

    // Use the Day model to update the date
    const response = await Day.update(date)

    // If there response has an id, then the date was updated
    if (response && response.id) {
      // Fetch the date from the database
      // const updatedDate = await Day.findById(response.id)

      // // Update the date in the state
      // setDates({
      //   EntityList: [...dates.EntityList, updatedDate],
      //   EntityIds: [...dates.EntityIds, updatedDate.id]

      // Fetch all dates to update the state
      _LoadAllDates()
    }

    setIsLoadingUpdateDate(false)
  }

  const _SubmitDate = (date: any, params: any) => {
    setIsSubmittingDate(true)
    Day.submit(date, params)
      .then(() => {
        Day.findAll()
          .then(dates => {
            setDates({
              EntityList: dates,
              EntityIds: dates.map(date => date.id)
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))

    setIsSubmittingDate(false)
  }

  return (
    <DatesContext.Provider
      value={{
        dates,
        LoadAllDates: _LoadAllDates,
        isLoadingAllDates,
        UpdateDate: _UpdateDate,
        isLoadingUpdateDate,
        SubmitDate: _SubmitDate,
        isSubmittingDate
      }}
    >
      {props.children}
    </DatesContext.Provider>
  )
}

export default DatesContextProvider
