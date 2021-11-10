import { Box, Center, Text } from '@chakra-ui/react'
import { ExtraDataType } from '../types'

const DateItem = ({
  isSelected,
  isInMonth,
  date,
  onSelect,
  extraData,
  Container
}: {
  isSelected: boolean
  isInMonth: boolean
  date: Date
  onSelect: (date: Date) => void
  extraData?: ExtraDataType
  Container?: ({ date, value }) => JSX.Element
}) => {
  return (
    <Center
      background={isSelected ? 'whiteAlpha.300' : 'transparent'}
      borderRadius="xl"
      onClick={() => onSelect(date)}
      flexDir="column"
    >
      <Text color={isInMonth ? 'blue.50' : 'blue.700'}>{date.getDate()}</Text>
      {extraData !== null && extraData !== undefined ? (
        <Box>
          {Container !== null && Container !== undefined ? <Container {...extraData} /> : null}
        </Box>
      ) : null}
    </Center>
  )
}

export default DateItem
