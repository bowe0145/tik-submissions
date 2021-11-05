import { createContext, FC, useContext, useEffect, useRef, useState } from 'react'
import { Auth } from 'aws-amplify'
import { Day } from '../../../model/Day'

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
  const [dates, setDates] = useState<EntityAdapter>({
    EntityList: [],
    EntityIds: []
  })
  const [isLoadingAllDates, setIsLoadingAllDates] = useState(false)
  const [isLoadingUpdateDate, setIsLoadingUpdateDate] = useState(false)
  const [isSubmittingDate, setIsSubmittingDate] = useState(false)

  const dateFetchingInterval = useRef<any>(null)

  // Use Day.findAll() to fetch all dates when the component mounts
  useEffect(() => {
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
  }, [])

  // Use Day.findAll() to fetch all dates every 10 seconds in a useEffect
  useEffect(() => {
    dateFetchingInterval.current = setInterval(() => {
      console.log(`fetching all Days`)
      Day.findAll()
        .then(dates => {
          setDates({
            EntityList: dates,
            EntityIds: dates.map(date => date.id)
          })
        })
        .catch(err => console.log(err))
    }, 10000)

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

  const _UpdateDate = (date: any) => {
    setIsLoadingUpdateDate(true)
    Day.update(date)
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
