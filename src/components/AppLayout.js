import React from 'react'
import styled from 'styled-components/macro'

import AppHeader from './AppHeader'

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
    return (
        <Container>
            <AppHeader />
            <Body>{props.children}</Body>
        </Container>
    )
}

export default AppLayout
