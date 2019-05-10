import React from 'react'
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components/macro'

import AppHeader from './AppHeader'

const darkTheme = {
    backgroundColor: "#2b2b47",
    foregroundColor: "#333355",
    textColor: "#8a88c2",
    textPlaceholderColor: "#8a88c2a1",
    primaryAccentColor: "#627FD9",
    secondaryAccentColor: "#F18C64",
};

const Container = styled.div`
    background: linear-gradient(45deg, #1c1e30 0%, #2f3050 100%);
    // width: 100vw;
    // height: 100vh;
    max-width: 100%;
    min-height: 100%;
    // overflow: hidden;
`
const Body = styled.div`
    padding-top: 40px;
    height: calc(100vh - 56px);
    // touch-action: pan-x pan-y; //todo: Get drag scroll working
`

function AppLayout(props) {
    //2do, allow theme switching
    const theme = darkTheme;
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
        border: 1px solid rgba(0, 0, 0, 0.8);
        z-index: 800;
    }

    .react-contextmenu--visible {
        background: white;
    }

    .react-contextmenu-item {
        padding: 8px;
        cursor: default;
    }
    .react-contextmenu-item:hover {
        background: rgb(8, 190, 203);
        color: white;
    }

    .react-contextmenu-item--divider:hover {
        background: white;
    }

    .react-contextmenu-toggle {
    }

    .react-contextmenu-toggle.is-selected {
        background-color: rgb(8, 203, 148);
        color: white;
    }

    * {
        user-select: none;
    }

    button {
        outline: none;
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