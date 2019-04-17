import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import getAllProjects from '../api/getAllProjects'
import getTasks from '../api/getTasks'
import { connect } from 'react-redux'
import { reassignTask } from '../store/actions.js'
const uuidv4 = require('uuid/v4');

Modal.setAppElement('#root')

const ReassignTask = ({projects, timers, timer, reassignTask, modalOpen, closeModal}) => {

    const [loadingProjects, setLoadingProjects] = useState(false)
    const [projectOptions, setProjectOptions] = useState([])
    const [selectedProject, setSelectedProject] = useState(false)

    const [loadingTasks, setLoadingTasks] = useState(false)
    const [taskOptions, setTaskOptions] = useState([])
    const [selectedTask, setSelectedTask] = useState(false)

    useEffect(() => {
        if(modalOpen) {
            handleLoadProjects()
        }
    }, [modalOpen])

    const handleLoadProjects = async () => {
        setLoadingProjects(true)
        const options = Object.keys(projects).map(key => projects[key])
        setProjectOptions(options)
        setLoadingProjects(false)
    }
    const handleSelectProject = project => {
        setSelectedProject(project)
        handleLoadTasks(project)
    }

    
    const handleLoadTasks = async (project) => {
        setLoadingTasks(true)
        const result = await getTasks({projectId: project.id})
        // const options = result['todo-items']

        const unassignedTask = {content: 'Unassigned task', id: uuidv4(), unassignedTask: true}
        
        const options = result['todo-items'].filter(
                current => Object.keys(timers).reduce((acc, curr) => {
                        acc = acc ? timers[curr].task.id !== current.id : false
                        return acc
                }, true)
            )
            setTaskOptions(
                [
                    unassignedTask,
                    ...options
                ]
            )
        // setTaskOptions(options)
        setSelectedTask(unassignedTask)
        setLoadingTasks(false)
    }
    const handleSelectTask = task => {
        setSelectedTask(task)
    }


    const handleCloseModal = () => {
        setSelectedProject(false)
        setSelectedTask(false)
        setTaskOptions([])
        closeModal()
    }


    const handleReassignTask = () => {
        if(selectedProject) {
            reassignTask({timer, selectedProject, selectedTask})
            return handleCloseModal()
        }
        console.warn('no project selected.')
    }
    return (
        <>
            <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="TEST PROJECT MODAL">
                <div>{loadingProjects ? 'Updating projects...' : 'Projects up to date!'}</div>
                <Select
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={projectOptions}
                    onChange={handleSelectProject}
                />
                <div>{loadingTasks ? 'Updating tasks...' : 'Tasks up to date!'}</div>
                <Select
                    getOptionLabel={option => option.content}
                    getOptionValue={option => option.id}
                    options={taskOptions}
                    onChange={handleSelectTask}
                />
                <button onClick={handleReassignTask}>Add Selected Project</button>
                <button onClick={handleCloseModal}>Close Modal</button>
            </Modal>
        </>
    )
}




const mapStateToProps = ({ timers, projects }) => {
    return { timers, projects }
}

const mapDispatchToProps = { reassignTask }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReassignTask)
