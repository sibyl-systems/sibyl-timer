import * as React from 'react'
import store from '../store'
import { Provider } from 'react-redux'
import Head from 'next/head'
import Styled, { ThemeProvider, DefaultTheme } from 'styled-components'
import { ModalProvider, BaseModalBackground } from 'styled-react-modal'
import GlobalStyles from '../globalStyles'
const theme: DefaultTheme = {
    color: {
        primary: '#627FD9',
        secondary: '#F18C64',
        background: {
            app: '#1E1D2A',
            header: '#2F2E42',
            column: '#2F2E42',
            card: '#423F5C',
            button: '#5F5D82',
        },
        text: '#8a88c2',
        error: '#ef4b4b',
    },
    font: {
        name: 'Nunito Sans',
        light: 200,
        regular: 300,
        bold: 700,
    },
}

const App = (props: any) => {
    return (
        <Provider store={store}>
            <Head>
                <title>Sibyl Timer</title>
            </Head>
            <ThemeProvider theme={theme}>
                <ModalProvider backgroundComponent={SpecialModalBackground}>
                    <props.Component {...props.pageProps} />
                </ModalProvider>
                <GlobalStyles />
            </ThemeProvider>
        </Provider>
    )
}

const SpecialModalBackground = Styled(BaseModalBackground)`
  /* Modal background should always be on top of everything. */
  z-index: 1000;
`

export default App
