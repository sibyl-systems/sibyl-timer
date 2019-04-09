/**
 * # todo:
 * - just all of it
 */

import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import getAllTasks from '../api/getAllTasks'

Modal.setAppElement('#root')

const AddNewTimerToTask = ({ addTimer, tasks }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [loadingTasks, setLoadingTasks] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedTask, setSelectedTask] = useState([])
    const handleLoadTasks = async () => {
        setLoadingTasks(true)
        const result = await getAllTasks()
        const options = result.tasks.filter(
            current => !Object.keys(tasks).includes(current.id)
        )
        setOptions(options)
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
    const handleaddTimer = () => {
        addTimer(selectedTask)
        handleCloseModal()
    }
    return (
        <>
            <button onClick={handleOpenModal}>Add new task</button>
            <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="TEST TASK MODAL">
                <div>{loadingTasks ? 'Updating tasks...' : 'Tasks up to date!'}</div>
                <Select
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={options}
                    onChange={handleSelectTask}
                />
                <button onClick={handleaddTimer}>Add Selected Task</button>
                <button onClick={handleCloseModal}>Close Modal</button>
            </Modal>
        </>
    )
}

export default AddNewTimerToTask
