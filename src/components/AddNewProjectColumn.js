import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import getAllProjects from '../api/getAllProjects'

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
            <button onClick={handleOpenModal}>Add new project</button>
            <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="TEST PROJECT MODAL">
                <div>{loadingProjects ? 'Updating projects...' : 'Projects up to date!'}</div>
                <Select
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={options}
                    onChange={handleSelectProject}
                />
                <button onClick={handleAddProject}>Add Selected Project</button>
                <button onClick={handleCloseModal}>Close Modal</button>
            </Modal>
        </>
    )
}

export default AddNewProjectColumn
