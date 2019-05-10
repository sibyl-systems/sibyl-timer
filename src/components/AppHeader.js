import React from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as Logo } from '../assets/logo.svg'
import { connect } from 'react-redux'

import { addProject } from '../store/actions'
import AddNewProjectColumn from 'components/Modals/AddNewProjectColumn'

const Header = styled.div`
    background: ${props => props.theme.foregroundColor};
    width: 100%;
    height: 56px;
    display: flex;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
`
const StyledLogo = styled(Logo)`
    path {
        fill: ${props => props.theme.textColor};
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
