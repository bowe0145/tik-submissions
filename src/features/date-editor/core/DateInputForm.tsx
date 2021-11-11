import { Box, Button, FormControl, FormLabel, Input, Switch } from '@chakra-ui/react'
import { useDateEditor } from '../context/DateEditorProvider'

const DateInputForm = () => {
  const { hours, isSickDay, isVacation, setHours, setIsVacation, setIsSickDay } = useDateEditor()
  const testChange = e => {
    console.log(e)
    setHours(e.target.value)
  }
  return (
    <Box display="flex" flexDir="column" justifyContent="center" alignContent="center" gridGap={2}>
      <FormControl
        display="flex"
        flexDir="row"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        p={2}
      >
        <FormLabel htmlFor="hours">Hours</FormLabel>
        <Input type="number" id="hours" value={hours} onChange={testChange} />
      </FormControl>

      <Box display="flex" flexDir="row" justifyContent="space-around" alignContent="center" p={2}>
        <FormControl>
          <FormLabel textAlign="center" htmlFor="isSickDay">
            Sick Day
          </FormLabel>
          <Switch
            type="checkbox"
            id="isSickDay"
            checked={!!isSickDay}
            isChecked={!!isSickDay}
            onChange={e => setIsSickDay(e.target.checked)}
          />
        </FormControl>

        <FormControl>
          <FormLabel textAlign="center" htmlFor="isVacationDay">
            Vacation Day
          </FormLabel>
          <Switch
            type="checkbox"
            id="isVacationDay"
            checked={isVacation}
            isChecked={isVacation}
            onChange={e => setIsVacation(e.target.checked)}
          />
        </FormControl>
      </Box>
    </Box>
  )
}

export default DateInputForm
