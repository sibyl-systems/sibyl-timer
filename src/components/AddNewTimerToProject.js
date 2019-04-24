/**
 * # todo:
 * - just all of it
 */

import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import getTasks from '../api/getTasks'
import Styled from 'styled-components'
const uuidv4 = require('uuid/v4');


Modal.setAppElement('#root')


const AddButton = Styled.button`
    border: none;
    background: none;
    box-shadow: none;
    width: 36px;
    height: 36px;
    position: relative;
    border-radius: 5px;
    &:hover {
        background: #45476E;
    }
    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        background-color: #627FD9;
        margin: auto;
    }
    &::before {
        width: 45%;
        height: 4px;
    }
    &::after {
        height: 45%;
        width: 4px;
    }
`

const AddNewTimerToTask = ({ addTimer, timers, project }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [loadingTasks, setLoadingTasks] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedTask, setSelectedTask] = useState(false)
    const handleLoadTasks = async () => {
        setLoadingTasks(true)
        try {
            const result = await getTasks({projectId: project.id})
            // todo: Simplify this
            const options = result['todo-items'].filter(
                current => timers.reduce((acc, curr) => {
                        acc = acc ? curr.task.id !== current.id : false
                        return acc
                }, true)
            )
            setOptions(
                [
                    {content: 'Unassigned task', id: uuidv4(), unassignedTask: true},
                    ...options
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
        setSelectedTask(false)
    }
    const handleAddTimer = () => {
        if(selectedTask) {
            addTimer({task: selectedTask, projectId: project.id})
            return handleCloseModal()
        }
        console.warn('no task selected');
    }

    return (
        <>
            <AddButton onClick={handleOpenModal} ></AddButton>
            <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="TEST TASK MODAL">
                <div>{loadingTasks ? 'Updating tasks...' : 'Tasks up to date!'}</div>
                <Select
                    getOptionLabel={option => option.content}
                    getOptionValue={option => option.id}
                    options={options}
                    onChange={handleSelectTask}
                />
                <button onClick={handleAddTimer}>Add Selected Task</button>
                <button onClick={handleCloseModal}>Cancel</button>
            </Modal>
        </>
    )
}

export default AddNewTimerToTask
