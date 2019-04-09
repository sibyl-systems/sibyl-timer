/**
 * # todo:
 * - Persist recent projects
 */

import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import getAllProjects from '../api/getAllProjects'

Modal.setAppElement('#root')

const AddNewProjectColumn = ({ addProject, projects }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [loadingProjects, setLoadingProjects] = useState(false)
    const [options, setOptions] = useState([])
    // // const [recentProjects, setRecentProjects] = useState([{ name: 'test' }])
    const [selectedProject, setSelectedProject] = useState([])
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
    }
    const handleAddProject = () => {
        // addRecentProject(selectedProject)
        addProject(selectedProject)
        handleCloseModal()
    }
    // const addRecentProject = selectedProject => {
    //     setRecentProjects(recentProjects => {
    //         if (recentProjects.includes(selectedProject)) {
    //             return recentProjects
    //         }
    //         const newProjects = [selectedProject, ...recentProjects]
    //         newProjects.splice(4, 1)
    //         console.log(selectedProject)
    //         // console.log(recentProjects)
    //         console.log(newProjects)
    //         return newProjects
    //     })
    // }
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
                {/* {recentProjects.map(project => (
                    <div key={project.id}>
                        <label htmlFor={project.id}>
                            <input type="radio" onChange={() => handleSelectProject(project)} />
                            {project.name}
                        </label>
                    </div>
                ))} */}
                <button onClick={handleAddProject}>Add Selected Project</button>
                <button onClick={handleCloseModal}>Close Modal</button>
            </Modal>
        </>
    )
}

export default AddNewProjectColumn
