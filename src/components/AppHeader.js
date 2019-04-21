import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Logo } from '../assets/logo.svg'

const Header = styled.div`
    background: #333355;
    width: 100%;
    height: 56px;
    display: flex;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
`
const StyledLogo = styled(Logo)`
    path {
        fill: #8a88c2;
    }
`

function AppHeader(props) {
    return (
        <Header>
            <StyledLogo width="32px" height="32px" />

            <button>Add Project</button>
            {/* <AddNewProjectColumn addProject={addProject} projects={projects} /> */}
        </Header>
    )
}

export default AppHeader
