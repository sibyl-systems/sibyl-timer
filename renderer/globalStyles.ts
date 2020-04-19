import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyles = createGlobalStyle`
    ${normalize};
    * {
        box-sizing: border-box;
    }
    html {
        font-family: ${p => p.theme.font.name || 'sans-serif'};
        font-weight: ${p => p.theme.font.regular};
        color: ${p => p.theme.color.text};
        font-family: 'Quicksand', sans-serif;
        line-height: 1.45;
        background: black;
    }
    body {
        background-color: ${p => p.theme.color.background.app};
        width: 100vw;
        height: 100vw;
        overflow: hidden;
    }
    svg {
        display: block;
    }
    a {
        color: inherit;
    }
`

export default GlobalStyles
