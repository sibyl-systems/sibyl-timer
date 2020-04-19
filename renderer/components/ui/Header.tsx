import * as React from 'react'
import Styled from 'styled-components'
import AddProject from '../modals/AddProject'

const Header = () => {
    const [projectModalOpen, setProjectModalOpen] = React.useState<boolean>(false)
    const toggleProjectModal: () => void = () => {
        setProjectModalOpen(o => !o)
    }
    return (
        <Container>
            <div>[logo]</div>
            <div>
                [button] <button onClick={toggleProjectModal}>[Add Project]</button>
            </div>
            <AddProject isOpen={projectModalOpen} toggleModal={toggleProjectModal} />
        </Container>
    )
}

const Container = Styled.div`
    background-color: ${p => p.theme.color.background.header};
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 12px;
`

export default Header
