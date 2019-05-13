import React from 'react'
import Styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro'

import AppHeader from 'components/AppHeader'

const darkTheme = {
    backgroundGradient: 'linear-gradient(45deg, #1c1e30 0%, #2f3050 100%)',
    backgroundAugment: 'rgba(0,0,0,0.1)',
    backgroundAugment2: 'rgba(0,0,0,0.1)',
    backgroundColor: '#2b2b47',
    foregroundColor: '#333355',
    foregroundColorLight: '#45476E',
    textColor: '#8a88c2',
    textPlaceholderColor: '#8a88c2a1',
    primaryAccentColor: '#627FD9',
    secondaryAccentColor: '#F18C64'
}

// const darkTheme = {
//     backgroundGradient: "linear-gradient(45deg, #FFF 0%, #EDE7F6 100%)",
//     backgroundAugment: "rgba(255,255,255,0.6)",
//     backgroundAugment2: "rgba(255,255,255,0.1)",
//     backgroundColor: "#D1C4E9",
//     foregroundColor: "#B39DDB",
//     foregroundColorLight: "#D1C4E9",
//     textColor: "#260e4c",
//     textPlaceholderColor: "#474954a1",
//     primaryAccentColor: "#9215b3",
//     secondaryAccentColor: "#9277ea",
// };

const Container = Styled.div`
    background: ${props => props.theme.backgroundGradient};
    // width: 100vw;
    // height: 100vh;
    max-width: 100%;
    min-height: 100%;
    // overflow: hidden;
`
const Body = Styled.div`
    padding-top: 40px;
    height: calc(100vh - 56px);
    // touch-action: pan-x pan-y; //todo: Get drag scroll working
`

function AppLayout(props) {
    //2do, allow theme switching
    const theme = darkTheme
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle />
                <Container>
                    <AppHeader />
                    <Body>{props.children}</Body>
                </Container>
            </>
        </ThemeProvider>
    )
}

export default AppLayout

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        user-select: none;
    }
    button {
        outline: none;
    }

    body {
        font-family: 'Nunito Sans', 'Roboto', 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        /* font-family: "Copse", serif; */
        color: rgba(0, 0, 0, 0.75);
        overflow: hidden;
        color: ${props => props.theme.textColor};
    }

    #root {
        height: 100vh;
        width: 100vw;
    }




    .react-contextmenu {
        border: 1px solid ${props => props.theme.primaryAccentColor};
        z-index: 800;
    }

    .react-contextmenu--visible {
        background: ${props => props.theme.backgroundColor};
    }

    .react-contextmenu-item {
        padding: 8px;
        cursor: default;
        a {
            color: inherit;
            text-decoration: none;
        }
    }
    .react-contextmenu-item:hover {
        background: ${props => props.theme.primaryAccentColor};
        // color: ${props => props.theme.textColor};
        color: #FFF;
    }

    .react-contextmenu-item--divider:hover {
        background: ${props => props.theme.backgroundColor};
    }

    .react-contextmenu-toggle {
    }

    .react-contextmenu-toggle.is-selected {
        background-color: ${props => props.theme.foregroundColor};
        color: ${props => props.theme.backgroundColor};
    }

    ::-webkit-scrollbar {
        width: 16px
    }

    ::-webkit-scrollbar-track {
        background: ${props => props.theme.backgroundColor};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.foregroundColor}
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #627FD8
    }

`
