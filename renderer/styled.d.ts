import 'styled-components'

// and extend it
declare module 'styled-components' {
    export interface DefaultTheme {
        color: {
            primary: string
            secondary: string
            background: {
                app: string
                header: string
                column: string
                card: string
                button: string
            }
            text: string
            error: string
        }
        font: {
            name: string
            light: number
            regular: number
            bold: number
        }
    }
}
