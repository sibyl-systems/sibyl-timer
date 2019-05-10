import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import getAllProjects from '../../api/getAllProjects'

import Styled from 'styled-components/macro'

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

const ModalContainer = Styled(Modal)`
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    width: 600px;
    max-width: 100%;
    margin: auto;
    border: 1px solid rgb(204, 204, 204);
    background: ${props => props.theme.backgroundColor};;
    overflow: auto;
    border-radius: 10px;
    overflow: hidden;
    outline: none;
    display: flex;
    flex-direction: column;
    min-height: 600px;

`
const ModalTitle = Styled.div`
    padding: 20px;
    min-height: 50px;
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.foregroundColor};
`
const ModalContent = Styled.div`
    padding: 20px;
`

const ButtonContainer = Styled.div`
    display: flex;
    margin-top: auto;
`

const ActionButton = Styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    border: none;
    border-top: 1px solid ${props => props.theme.primaryAccentColor};
    color: ${props => props.theme.textColor};
    box-shadow: none;
    padding: 8px 16px;
    width: 100%;
    min-height: 50px;
    &:hover {
        background-color: ${props => props.theme.primaryAccentColor};
        color: white;
    }
    &:first-child {
        border-right: 1px solid ${props => props.theme.primaryAccentColor};
    }

`

const customStyles = {
    option: (provided, state) => {
        return({
        // ...provided,
        // borderBottom: '1px dotted pink',
        // color: state.isSelected ? 'red' : 'blue',
        // padding: 20,
        padding: "8px",
        backgroundColor: state.isSelected ? '${props => props.theme.backgroundColor};' : 'transparent',
        color: state.isSelected ? '#627FD8' : 'inherit',
        '&:hover': {
            backgroundColor: '${props => props.theme.backgroundColor};',
            color: '#627FD8',
        },
        // ...provided
    })},
    menuList: (provided, state) => ({
        // ...provided,
        // borderBottom: '1px dotted pink',
        // color: state.isSelected ? 'red' : 'blue',
        // padding: 20,
        backgroundColor: '${props => props.theme.foregroundColor}',
        borderColor: '#627FD8',

        "::-webkit-scrollbar": {
            "width": "16px",
        },

        "::-webkit-scrollbar-track": {
            "background": "${props => props.theme.backgroundColor};" ,
        },
        
        /* Handle */
        "::-webkit-scrollbar-thumb": {
            "background": "${props => props.theme.textColor}" ,
        },

        /* Handle on hover */
        "::-webkit-scrollbar-thumb:hover": {
            "background": "#627FD8" ,
        },
        ...provided
    }),
    control: (provided, state) => {
        return {
            ...provided,
            background: 'transparent',
            border: '1px solid #627FD8',
            color: 'white',
            boxShadow: 'none',
            bordercolor: state.menuIsOpen && '#627FD8',
            '&:hover': {
                bordercolor: '#627FD8'
            }
        }
    },
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: 'white',
        '&:hover': {
            color: 'white'
        }
    }),
    singleValue: (provided, state) => {
        // const opacity = state.isDisabled ? 0.5 : 1;
        // const transition = 'opacity 300ms';

        return {
            ...provided,
            color: '${props => props.theme.textColor}',
        }
    }
}

Modal.setAppElement('#root')

const AddNewProjectColumn = ({ addProject, projects }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [loadingProjects, setLoadingProjects] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedProject, setSelectedProject] = useState(false)
    const handleLoadProjects = async () => {
        setLoadingProjects(true)
        const result = await getAllProjects()
        const options = result.projects.filter(current => !Object.keys(projects).includes(current.id))
        setOptions(options)
        setLoadingProjects(false)
    }
    const handleSelectProject = project => {
        setSelectedProject(project)
    }
    const handleOpenModal = () => {
        handleLoadProjects()
        setModalOpen(true)
    }
    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedProject(false)
    }
    const handleAddProject = () => {
        if (selectedProject) {
            addProject(selectedProject)
            handleCloseModal()
        }
        console.warn('no project selected.')
    }
    return (
        <>
            <Button onClick={handleOpenModal}>Add new project</Button>
            <ModalContainer isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="TEST PROJECT MODAL">
                <ModalTitle>Add Project</ModalTitle>
                <ModalContent>
                    <Select
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.id}
                        options={options}
                        onChange={handleSelectProject}
                        styles={customStyles}
                    />
                    {/* Todo: loading indicator... */}
                    <div style={{ paddingTop: '16px' }}>
                        {loadingProjects ? 'Updating projects...' : 'Projects up to date!'}
                    </div>
                </ModalContent>
                <ButtonContainer>
                    <ActionButton onClick={handleCloseModal}>Cancel</ActionButton>
                    <ActionButton onClick={handleAddProject}>Add Selected Project</ActionButton>
                </ButtonContainer>
            </ModalContainer>
        </>
    )
}

export default AddNewProjectColumn
