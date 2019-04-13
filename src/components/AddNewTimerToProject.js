/**
 * # todo:
 * - just all of it
 */

import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import getTasks from '../api/getTasks'
const uuidv4 = require('uuid/v4');

Modal.setAppElement('#root')

const AddNewTimerToTask = ({ addTimer, timers, project }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [loadingTasks, setLoadingTasks] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedTask, setSelectedTask] = useState([])
    const handleLoadTasks = async () => {
        setLoadingTasks(true)
        try {
            const result = await getTasks({projectId: project.id})
            // An update to data structure broke this
            // todo: fix for new structure
            // const options = result['todo-items'].filter(
            //     current => (!project.timerIds.includes(current.id))
            // )
            // setOptions(options)
            setOptions(
                [
                    {content: 'Unassigned task', id: uuidv4(), unassignedTask: true},
                    ...result['todo-items']
                ]
            )
        } catch (error) {
            console.error(error)
        }
        setLoadingTasks(false)
    }
    const handleSelectTask = task => {
        setSelectedTask(task)
    }
    const handleOpenModal = () => {
        handleLoadTasks()
        setModalOpen(true)
    }
    const handleCloseModal = () => {
        setModalOpen(false)
    }
    const handleAddTimer = () => {
        console.log(selectedTask);
        if(selectedTask) {
            addTimer({task: selectedTask, projectId: project.id})
            return handleCloseModal()
        }
        console.log('no task selected');
    }
    const thing = {content: "Unassigned", id: uuidv4()}

    return (
        <>
            <button onClick={handleOpenModal} style={{ marginTop: 'auto' }}>Add new Task</button>
            <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="TEST TASK MODAL">
                <div>{loadingTasks ? 'Updating tasks...' : 'Tasks up to date!'}</div>
                <Select
                    getOptionLabel={option => option.content}
                    getOptionValue={option => option.id}
                    options={options}
                    onChange={handleSelectTask}
                />
                <button onClick={handleAddTimer}>Add Selected Task</button>
                <button onClick={handleCloseModal}>Close Modal</button>
            </Modal>
        </>
    )
}

export default AddNewTimerToTask
