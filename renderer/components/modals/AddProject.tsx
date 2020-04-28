import * as React from 'react'
import Modal from 'styled-react-modal'
import useProjectSelect from '../../hooks/useProjectSelect'
import Select from '../ui/Select'
import store, { addProjectActionCreator } from '../../store'
import { Project } from '../../store/types'

const AddProject = ({ isOpen, toggleModal }: { isOpen: boolean, toggleModal: () => void }) => {
    const [options, selected] = useProjectSelect({ options: [], selected: null })
    const handleAddProject = () => {
        const projectData: Project = {
            id: 'some-project',
            title: 'Some Project',
            timerIds: [],
        }
        store.dispatch(addProjectActionCreator(projectData))
        toggleModal()
    }
    return (
        <StyledModal
            isOpen={isOpen}
            onBackgroundClick={toggleModal}
            onEscapeKeydown={toggleModal}
            active={isOpen}
        >
            <div>Add Project</div>
            <Select options={options} selected={selected} />
            <button onClick={toggleModal}>[cancel] </button>
            <button onClick={handleAddProject}>[Add]</button>
        </StyledModal>
    )
}

const StyledModal = Modal.styled`
    width: 504px;
    height: fit-content;
    position: absolute;
    top: 0; 
    bottom: 0; 
    left: 0; 
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    background-color: ${p => p.theme.color.white};
    box-shadow: 5px 6px 19px -4px rgba(142,142,142,0.71);
    padding: 30px;
    transition: 0.5s all ease-in-out;
`

export default AddProject
