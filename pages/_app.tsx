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

  const [pageState, setPageState] = useState<pageStateType>("ホーム");

  const theme = extendTheme({
    breakpoints: breakpoints,
    colors: {
      back: {
        100: "#ffffff",
        300: "#f0f0f0",
        500: "#f0f0f0",
        700: "#f0f0f0",
        900: "#f0f0f0",
      },
      accent: {
        100: "#349478",
        300: "#349478",
        500: "#349478",
        700: "#349478",
        900: "#349478",
      },
      base: {
        100: "#5bc4a6",
        300: "#5bc4a6",
        500: "#5bc4a6",
        700: "#5bc4a6",
        900: "#5bc4a6",
      },

    },
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
// カラー picker  #246B69 / #EFAA97 / #F0A0A8 / #F1A09E / #F6CBC0 / #ac2817

