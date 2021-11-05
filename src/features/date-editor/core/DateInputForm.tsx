import { FormControl, FormLabel, Input, Switch, Text } from '@chakra-ui/react'
import { useDateEditor } from '../context/DateEditorProvider'

const DateInputForm = () => {
  const { hours, isSickDay, isVacation, setHours, setIsVacation, setIsSickDay, date } =
    useDateEditor()

  return (
    <FormControl display="flex" flexDir="column" alignItems="center">
      <FormLabel htmlFor="hours">Hours</FormLabel>
      <Input type="number" id="hours" value={hours} onChange={e => setHours(+e.target.value)} />

      <FormLabel htmlFor="isSickDay">Sick Day</FormLabel>
      <Switch
        type="checkbox"
        id="isSickDay"
        checked={isSickDay}
        onChange={e => setIsSickDay(e.target.checked)}
      />

      <FormLabel htmlFor="isVacationDay">Vacation Day</FormLabel>
      <Switch
        type="checkbox"
        id="isVacationDay"
        checked={isVacation}
        onChange={e => setIsVacation(e.target.checked)}
      />
    </FormControl>
  )
}

export default DateInputForm
