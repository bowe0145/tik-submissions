import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, HStack } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useCalendar } from './context/CalendarProvider'

const ArrowRight = ({ onClick }) => (
  <HStack onClick={onClick} w={25} h={25} maxW={25}>
    <ChevronRightIcon h={25} w={25} boxSize="2em" />
  </HStack>
)

const DoubleArrowRight = ({ onClick }) => (
  <HStack onClick={onClick} w={25} h={25} maxW={25} style={{ marginRight: '12px' }}>
    <ChevronRightIcon h={25} w={25} boxSize="2em" />
    <ChevronRightIcon h={25} w={25} boxSize="2em" style={{ marginLeft: '-25px' }} />
  </HStack>
)

// const TripleArrowRight = ({ onClick }) => (
//   <HStack onClick={onClick} w={25} h={25} maxW={25} style={{ marginRight: '12px' }}>
//     <ChevronRightIcon h={25} w={25} boxSize="2em" />
//     <ChevronRightIcon h={25} w={25} boxSize="2em" style={{ marginLeft: '-25px' }} />
//     <ChevronRightIcon h={25} w={25} boxSize="2em" style={{ marginLeft: '-25px' }} />
//   </HStack>
// )

const ArrowLeft = ({ onClick }) => (
  <HStack onClick={onClick} w={25} h={25} maxW={25}>
    <ChevronLeftIcon h={25} w={25} boxSize="2em" />
  </HStack>
)

const DoubleArrowLeft = ({ onClick }) => (
  <HStack onClick={onClick} w={25} h={25} maxW={25} style={{ marginRight: '12px' }}>
    <ChevronLeftIcon h={25} w={25} boxSize="2em" />
    <ChevronLeftIcon h={25} w={25} boxSize="2em" style={{ marginLeft: '-25px' }} />
  </HStack>
)

// const TripleArrowLeft = ({ onClick }) => (
//   <HStack onClick={onClick} w={25} h={25} maxW={25} style={{ marginRight: '12px' }}>
//     <ChevronLeftIcon h={25} w={25} boxSize="2em" />
//     <ChevronLeftIcon h={25} w={25} boxSize="2em" style={{ marginLeft: '-25px' }} />
//     <ChevronLeftIcon h={25} w={25} boxSize="2em" style={{ marginLeft: '-25px' }} />
//   </HStack>
// )

const NavigationBar = () => {
  const { calendarDate, PrevMonth, PrevYear, NextMonth, NextYear } = useCalendar()

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      width="100%"
      minWidth="100%"
      p={3}
    >
      <HStack>
        <DoubleArrowLeft onClick={PrevYear} />
        <ArrowLeft onClick={PrevMonth} />
      </HStack>

      <HStack style={{ width: '90%', justifyContent: 'center' }}>
        {/* {Refresh !== null && Refresh !== undefined ? (
          <RepeatIcon h={10} w={10} onClick={Refresh} />
        ) : null} */}
        <p>
          {calendarDate.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: undefined
          })}
        </p>
      </HStack>

      <HStack>
        <ArrowRight onClick={NextMonth} />
        <DoubleArrowRight onClick={NextYear} />
      </HStack>
    </Box>
  )
}

export default NavigationBar
