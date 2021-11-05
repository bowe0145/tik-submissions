import { Box, Center, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { ExtraDataType } from '../types'

const Dot = () => (
  <Box
    w={2}
    h={2}
    border="1px"
    borderColor="red.300"
    backgroundColor="red.400"
    borderRadius="full"
  />
)

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
  const [data, setData] = useState<ExtraDataType | null>(null)
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
