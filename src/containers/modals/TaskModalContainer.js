import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Modal from 'react-modal'
import Styled from 'styled-components/macro'
import Select from 'react-select'

import getTasks from 'api/getTasks'
import uuidv4 from 'uuid'
import { addTimer } from 'store/actions'
import ResizableTextarea from 'components/ResizableTextarea'

import {
    ModalContainer,
    ModalTitle,
    ModalContent,
    ButtonContainer,
    ActionButton,
    selectStyles,
    Loader,
    Label,
    FormGroup
} from 'components/styles/modal'

Modal.setAppElement('#root')

const TaskModalContainer = ({ modalOpen, closeTimerModal, project }) => {
    const dispatch = useDispatch()
    const defaultValue = { content: "Unassigned task", id: uuidv4(), unassignedTask: true }

    useEffect(() => {
        handleLoadTasks()
        return () => {
            setSelectedTask(false)
        }
    }, [])

    const [loadingTasks, setLoadingTasks] = useState(false)
    const [taskOptions, setTaskOptions] = useState([])
    const [selectedTask, setSelectedTask] = useState(defaultValue)
    
    
    const [description, setDescription] = useState('')
    const [isBillable, setIsBillable] = useState(false)
    const [keepTimer, setKeepTimer] = useState(false)


    const handleLoadTasks = async () => {
        setLoadingTasks(true)
        const result = await getTasks({ projectId: project.id })
        setTaskOptions([defaultValue, ...result['todo-items']])
        setLoadingTasks(false)
    }
    const handleSelectTask = project => {
        setSelectedTask(project)
    }

    const handleCloseModal = () => {
        setSelectedTask(false)
        closeTimerModal()
    }

    const handleSubmitModal = () => {

        const options = {
            // selectedTask: project,
            projectId: project.id,
            selectedTask: selectedTask,
            description: description,
            settings: {
                isBillable: isBillable,
                keepTimer: keepTimer
            }
        }
        if (selectedTask) {
            dispatch(addTimer(options))
            setSelectedTask(false)
            closeTimerModal()
        }
        console.warn('no project selected.')
    }

    return (
        <ModalOuterContainer
            isOpen={modalOpen}
            onRequestClose={handleCloseModal}
            style={{ overlay: { backgroundColor: 'hsla(0, 0%, 0%, 0.33)' } }}
        >
            <ModalTitle>Add new Task</ModalTitle>
            <ModalContent>
                <FormGroup>
                    <Label>Select Task {loadingTasks ? <Loader title="Loading..." /> : null}</Label>
                    <Select
                        defaultValue={defaultValue}
                        styles={selectStyles}
                        getOptionLabel={option => option.content}
                        getOptionValue={option => option.id}
                        options={taskOptions}
                        onChange={handleSelectTask}
                        value={selectedTask}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Timer description</Label>
                    <DescriptionTextarea isEmpty={!description} value={description} setValue={setDescription} />
                </FormGroup>

                <TimeInputContainer>
                    <CheckboxInput htmlFor={`is-billable`}>
                        <input
                            type="checkbox"
                            checked={isBillable}
                            value="isBillable"
                            name="isBillable"
                            onChange={() => setIsBillable(value => !value)}
                            id={`is-billable`}
                        />
                        <CheckboxInputHelper />
                        Billable?
                    </CheckboxInput>
                    <CheckboxInput htmlFor={`keep-timer`}>
                        <input
                            id={`keep-timer`}
                            type="checkbox"
                            checked={keepTimer}
                            value="keepTimer"
                            name="keepTimer"
                            onChange={() => setKeepTimer(value => !value)}
                        />
                        <CheckboxInputHelper />
                        Keep timer?
                    </CheckboxInput>
                </TimeInputContainer>
            </ModalContent>
            <ButtonContainer>
                <ActionButton onClick={handleCloseModal}>Cancel</ActionButton>
                <ActionButton onClick={handleSubmitModal}>Add Task</ActionButton>
            </ButtonContainer>
        </ModalOuterContainer>
    )
}

export default TaskModalContainer

const ModalOuterContainer = Styled(ModalContainer)`
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    width: 440px;
    max-width: 100%;
    margin: auto;
    border: none;
    background: ${props => props.theme.backgroundColor};;
    overflow: auto;
    border-radius: 10px;
    overflow: visible;
    outline: none;
    display: flex;
    flex-direction: column;
    min-height: 200px;

`

const DescriptionTextarea = Styled(ResizableTextarea)`
    background: none;
    color: ${props => props.theme.textColor};
    width: 100%;
    box-sizing: border-box;
	border: none;
	border-radius: 0;
	resize: none;
	font-size: 14px;
	line-height: 18px;
	overflow: auto;
	height: auto;
	padding: 6px 1px 2px;
    border-bottom: 1px solid transparent;
    font-weight: 400;
    border-bottom: 1px solid ${props => props.theme.foregroundColor};
    &:focus {
        outline: none;
        border-bottom: 1px solid ${props => props.theme.primaryAccentColor};
    }
	&::placeholder {
		color: ${props => props.theme.textColor}a1;
    }
    // background-color: ${props => props.theme.backgroundAugment2};
    padding: 9px 9px;
    border: 1px solid ${props => props.theme.primaryAccentColor};
    width: calc(100% - 10px);
`

const TimeInputContainer = Styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 24px;
`

const CheckboxInputHelper = Styled.div`
    width: 35px;
    height: 35px;
    border: 1px solid ${props => props.theme.primaryAccentColor};
    // background-color: ${props => props.theme.backgroundAugment2};
    margin-right: 15px;
    position: relative;
    &::before {
        content: "";
        position: absolute;
        top: 0; left: 0; right:0; bottom: 0;
        width: 40%;
        height: 15%;
        border-left: 3px solid ${props => props.theme.primaryAccentColor};
        border-bottom: 3px solid ${props => props.theme.primaryAccentColor};
        margin: auto;
        transform: translateY(-21%) translateX(6%) skew(-10deg, 0deg) rotate(-54deg);
        display: none;
    }
`

const CheckboxInput = Styled.label`
    margin-right: 24px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.textColor};
    input {
        display: none;
        &:checked {
            ~ ${CheckboxInputHelper} {
                &::before {
                    display: block;
                }
            }
        }
    }
`
