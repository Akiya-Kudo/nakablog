import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { pageStateType } from '../src/types/MicroCms'
import { useState } from 'react'

const breakpoints = createBreakpoints({
  sm: "48.1em", 
  md: "68.7em",
  lg: "78.1em",
  xl: "93.7em",
  "2xl": "109.3em",
});

function MyApp({ Component, pageProps }: AppProps) {

  const [pageState, setPageState] = useState<pageStateType>("日常");

  const theme = extendTheme({
    breakpoints: breakpoints,
    colors: {
      back: {
        100: "rgb(255, 255, 246)",
        300: "rgb(251, 251, 235)",
        500: "rgb(243, 243, 220)",
        700: "rgb(255, 255, 243)",
        900: "rgb(167, 167, 58)",
      },
      base: {
        100: "#cee8e2",
        300: "#a5e8cb",
        500: "#61cea2",
        700: "#009b85",
        900: "rgb(58, 131, 63)",
      },
      accent: {
        100: "#f3a599",
        300: "#ed7966",
        500: "#e9421b",
        700: "#cd1327",
        900: "#c04853",
      },
    } 
  })
  return (
    <ChakraProvider theme={theme}>
      <Component isTag={pageState} setTag={setPageState} {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
// function createBreakpoints(arg0: { sm: string; md: string; lg: string; xl: string; }) {
//   throw new Error('Function not implemented.');
// }

