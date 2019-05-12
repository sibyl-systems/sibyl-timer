import React, {useState} from 'react'
import Styled from 'styled-components/macro'

import { ReactComponent as Logo } from 'assets/logo.svg'
import { connect } from 'react-redux'

import { addProject } from 'store/actions'

import ProjectModalContainer from 'containers/modals/ProjectModalContainer'

const Header = Styled.div`
    background: ${props => props.theme.foregroundColor};
    width: 100%;
    height: 56px;
    display: flex;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
`
const StyledLogo = Styled(Logo)`
    path {
        fill: ${props => props.theme.textColor};
    }
`

function AppHeader(props) {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <Header>
            <StyledLogo width="32px" height="32px" />
            <Button onClick={() => setModalOpen(true)}>Add new project</Button>

            {props.user.code && modalOpen && (
                <ProjectModalContainer
                    closeTimerModal={() => setModalOpen(false)}
                    modalOpen={modalOpen}
                />
            )}
        </Header>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = { addProject }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppHeader)


const Button = Styled.button`
    background-color: transparent;
    border: 1px solid ${props => props.theme.primaryAccentColor};
    color: ${props => props.theme.textColor};
    box-shadow: none;
    border-radius: 100px;
    padding: 8px 16px;
    &:hover {
        background-color: ${props => props.theme.primaryAccentColor};
        color: white;
    }
`