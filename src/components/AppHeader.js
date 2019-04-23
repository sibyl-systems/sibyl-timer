import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Logo } from '../assets/logo.svg'
import { connect } from 'react-redux'

import { addProject } from '../store/actions'
import AddNewProjectColumn from './AddNewProjectColumn'

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
            {props.user.code && <AddNewProjectColumn addProject={props.addProject} projects={props.projects} />}
        </Header>
    )
}

const mapStateToProps = state => {
    return {
        projects: state.projects,
        user: state.user
    }
}

const mapDispatchToProps = { addProject }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppHeader)
