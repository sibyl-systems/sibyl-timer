/**
 * # todo:
 * - just all of it
 */

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import Select from 'react-select'
import getTasks from '../../api/getTasks'
import Styled from 'styled-components/macro'
import { addTimer } from 'store/actions'

const uuidv4 = require('uuid/v4')


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

const ModalContainer = Styled(Modal)`
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    width: 600px;
    max-width: 100%;
    margin: auto;
    border: 1px solid rgb(204, 204, 204);
    background: #2b2b47;
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
    color: #FFF;
    background: #333355;
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
    border-top: 1px solid #627FD9;
    color: #8a88c2;
    box-shadow: none;
    padding: 8px 16px;
    width: 100%;
    min-height: 50px;
    &:hover {
        background-color: #627FD9;
        color: white;
    }
    &:first-child {
        border-right: 1px solid #627FD9;
    }

`

const customStyles = {
    option: (provided, state) => {
        return {
            // ...provided,
            // borderBottom: '1px dotted pink',
            // color: state.isSelected ? 'red' : 'blue',
            // padding: 20,
            padding: '8px',
            backgroundColor: state.isSelected ? '#2b2b47' : 'transparent',
            color: state.isSelected ? '#627FD8' : 'inherit',
            '&:hover': {
                backgroundColor: '#2b2b47',
                color: '#627FD8'
            }
            // ...provided
        }
    },
    menuList: (provided, state) => ({
        // ...provided,
        // borderBottom: '1px dotted pink',
        // color: state.isSelected ? 'red' : 'blue',
        // padding: 20,
        backgroundColor: '#333355',
        borderColor: '#627FD8',

        '::-webkit-scrollbar': {
            width: '16px'
        },

        '::-webkit-scrollbar-track': {
            background: '#2b2b47'
        },

        /* Handle */
        '::-webkit-scrollbar-thumb': {
            background: '#8a88c2'
        },

        /* Handle on hover */
        '::-webkit-scrollbar-thumb:hover': {
            background: '#627FD8'
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
            color: '#8a88c2'
        }
    }
}

const AddNewTimerToTask = ({ project }) => {
    const timers = useSelector(state => state.timers)
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const [loadingTasks, setLoadingTasks] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedTask, setSelectedTask] = useState(false)
    const defaultValue = { content: 'Unassigned task', id: uuidv4(), unassignedTask: true }
    const handleLoadTasks = async () => {
        setLoadingTasks(true)
        try {
            const result = await getTasks({ projectId: project.id })
            // todo: Simplify this
            // const options = result['todo-items'].filter(current =>
            //     timers.reduce((acc, curr) => {
            //         acc = acc ? curr.task.id !== current.id : false
            //         return acc
            //     }, true)
            // )
            // setOptions([defaultValue, ...options])
            setOptions([defaultValue, ...result['todo-items']])
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
        if (selectedTask) {
            dispatch(addTimer({ task: selectedTask, projectId: project.id }))
            return handleCloseModal()
        } else {
            dispatch(addTimer({ task: defaultValue, projectId: project.id }))
            return handleCloseModal()
        }
    }

    return (
        <>
            <AddButton onClick={handleOpenModal} />

            <ModalContainer isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="TEST TASK MODAL">
                <ModalTitle>Add Project</ModalTitle>
                <ModalContent>
                    <Select
                        defaultValue={defaultValue}
                        getOptionLabel={option => option.content}
                        getOptionValue={option => option.id}
                        options={options}
                        onChange={handleSelectTask}
                        styles={customStyles}
                    />
                    {/* Todo: loading indicator... */}
                    <div style={{ paddingTop: '16px' }}>{loadingTasks ? 'Updating tasks...' : 'Tasks up to date!'}</div>
                </ModalContent>
                <input type="text" />
                <ButtonContainer>
                    <ActionButton onClick={handleCloseModal}>Cancel</ActionButton>
                    <ActionButton onClick={handleAddTimer}>Add Selected Task</ActionButton>
                </ButtonContainer>
            </ModalContainer>
        </>
    )
}

export default AddNewTimerToTask
