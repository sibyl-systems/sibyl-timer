import React from 'react'
import styled from 'styled-components'

import AppHeader from './AppHeader'

const Container = styled.div`
    background: linear-gradient(45deg, #1c1e30 0%, #2f3050 100%);
    width: 100%;
    height: 100%;
`
const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 40px;
    height: calc(100vh - 56px);
    // overflow: auto;
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
