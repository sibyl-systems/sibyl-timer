import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import getAllProjects from '../api/getAllProjects'

import Styled from 'styled-components'

const Button = Styled.button`
    background-color: transparent;
    border: 1px solid #627FD9;
    color: #8a88c2;
    box-shadow: none;
    border-radius: 100px;
    padding: 8px 16px;
    &:hover {
        background-color: #627FD9;
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
    bottom: 40px;
    margin: auto;
    border: 1px solid rgb(204, 204, 204);
    background: #2b2b47;
    overflow: auto;
    border-radius: 10px;
    overflow: hidden;
    outline: none;
    padding: 20px;
`
const ModalTitle = Styled.div`
    margin: -20px -20px 0;
    padding: 16px;
    min-height: 50px;
    color: #FFF;
    background: #333355;
    margin-bottom: 20px;
`

const StyledSelect = Styled(Select)`

`



const customStyles = {
  option: (provided, state) => ({
    // ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
    ...provided
  }),
  control: (provided, state) => ({
      ...provided
    // none of react-select's styles are passed to <Control />
    // width: 200,
  }),
  singleValue: (provided, state) => {
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';

    // return { ...provided, opacity, transition };
    return provided
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
        const options = result.projects.filter(
            current => !Object.keys(projects).includes(current.id)
        )
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
        if(selectedProject) {
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

                <StyledSelect
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={options}
                    onChange={handleSelectProject}
                    styles={customStyles}
 
                />
                <button onClick={handleAddProject}>Add Selected Project</button>
                <button onClick={handleCloseModal}>Cancel</button>
                <div>{loadingProjects ? 'Updating projects...' : 'Projects up to date!'}</div>
            </ModalContainer>
        </>
    )
}

export default AddNewProjectColumn
