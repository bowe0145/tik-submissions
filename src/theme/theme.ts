// 1. import `extendTheme` function
import { extendTheme, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react'
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}
// 3. extend the theme
const theme = extendTheme(
  {
    components: {
      Link: {
        baseStyle: {
          color: 'tik.400'
        }
      },
      Input: {
        baseStyle: {
          focusBorderColor: 'tik.400',
          borderColor: 'tik.400'
        }
      }
    },
    colors: {
      tik: {
        50: '#ECF8F9',
        100: '#C9EBEE',
        200: '#A6DFE3',
        300: '#83D2D8',
        400: '#60C6CD',
        500: '#3DB9C2',
        600: '#31949B',
        700: '#256F74',
        800: '#184A4E',
        900: '#0C2527'
      }
    },
    config
  },
  withDefaultColorScheme({ colorScheme: 'tik' })
)
export default theme
