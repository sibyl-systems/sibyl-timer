import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'

import uuidv4 from 'uuid'

import Styled from 'styled-components/macro'

import getAllProjects from 'api/getAllProjects'
import getTasks from 'api/getTasks'

import Select from 'react-select'

import ResizableTextarea from 'components/ResizableTextarea'
import { object } from 'prop-types'

import {
    AddButton,
    ModalContainer,
    ModalTitle,
    ModalContent,
    ButtonContainer,
    ActionButton,
    selectStyles,
    Loader,
    Label,
    FormGroup,
} from 'components/styles/modal'

Modal.setAppElement('#root')

const TimerModalContainer = ({ children, modalOpen, modalType, timer, closeTimerModal }) => {
    const projects = useSelector(state => state.projects)
    const timers = useSelector(state => state.timers)

    useEffect(() => {
        if (modalOpen && !loadingProjects) {
            handleLoadProjects()
            setDescription(timer.description)
        }
        return () => {
            setSelectedProject(false)
            setSelectedTask(false)
            setTaskOptions([])
        }
    }, [modalOpen, modalType])

    const [loadingProjects, setLoadingProjects] = useState(false)
    const [projectOptions, setProjectOptions] = useState([])
    const [selectedProject, setSelectedProject] = useState(false)

    const [loadingTasks, setLoadingTasks] = useState(false)
    const [taskOptions, setTaskOptions] = useState([])
    const [selectedTask, setSelectedTask] = useState(false)
    const [description, setDescription] = useState(timer.description | '')

    const { hours, minutes } = secondsToHMS(timer.elapsedTime)
    const [time, setTime] = useState({
        hours: hours | 0,
        minutes: minutes | 0
    })

    const [isBillable, setIsBillable] = useState(timer.settings.isBillable | false)
    const [keepTimer, setKeepTimer] = useState(timer.settings.keepTimer | false)

    const handleLoadProjects = async () => {
        //2do: set current projects in memory as the available options first.
        setLoadingProjects(true)
        const result = await getAllProjects()
        const options = result.projects
        const project =
            projects[
                Object.keys(projects).filter(key => {
                    return projects[key].timerIds.includes(timer.id)
                })
            ]
        setProjectOptions(options)
        setSelectedProject(project)
        setLoadingProjects(false)
        handleLoadTasks(project)
    }
    const handleSelectProject = project => {
        setSelectedProject(project)
        handleLoadTasks(project, true)
    }

    const handleLoadTasks = async (project, dirtyProjects = false) => {
        setLoadingTasks(true)
        const result = await getTasks({ projectId: project.id })
        const unassignedTask = { content: 'Unassigned task', id: uuidv4(), unassignedTask: true }
        const options = result['todo-items'].filter(current =>
            Object.keys(timers).reduce((acc, curr) => {
                acc = acc ? current.id === timer.task.id || timers[curr].task.id !== current.id : false
                return acc
            }, true)
        )
        setTaskOptions([unassignedTask, ...options])
        if (dirtyProjects) {
            setSelectedTask(unassignedTask)
        } else {
            setSelectedTask(
                options.find(option => {
                    return option.id === timer.task.id
                }) || timer.task
            )
        }
        setLoadingTasks(false)
    }
    const handleSelectTask = task => {
        setSelectedTask(task)
    }

    const handleTimeOnChange = e => {
        if (e && e.target.name && (Number(e.target.value) || e.target.value === '' || e.target.value == 0)) {
            setTime({
                ...time,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleCloseModal = () => {
        setSelectedProject(false)
        closeTimerModal()
    }

    const handleSubmitModal = () => {
        if(modalType === 'edit') {
            console.log('edit timer');
        } else if(modalType === 'log') {
            console.log('log timer');
        }
        setSelectedProject(false)
        setSelectedTask(false)
        closeTimerModal()
        // submitModal({
        //     timer
        //     selectedProject
        //     selectedTask
        //     description
        //     HoursAndMinutesToSeconds(time)
        //     settings: {
        //         isBillable,
        //         keepTimer,
        //     }
        // })
    }

    return (
        <ModalOuterContainer isOpen={modalOpen} onRequestClose={handleCloseModal}>
            <ModalTitle>
                {modalType === 'edit' && 'Edit timer'}
                {modalType === 'log' && 'Log timer'}
            </ModalTitle>
            <ModalContent>
                <FormGroup>

                <Label>Select Project {loadingProjects ? <Loader title="Loading..." /> : null}</Label>
                <Select
                    styles={selectStyles}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={projectOptions}
                    onChange={handleSelectProject}
                    value={selectedProject}
                />
                </FormGroup>

                <FormGroup>
                    <Label>Select Task {loadingTasks ? <Loader title="Loading..." /> : null}</Label>
                    {selectedProject ? (
                            <Select
                                styles={selectStyles}
                                getOptionLabel={option => option.content}
                                getOptionValue={option => option.id}
                                options={taskOptions}
                                onChange={handleSelectTask}
                                value={selectedTask}
                            />
                    ) : <Select styles={selectStyles} isDisabled={true} />}
                </FormGroup>

                <FormGroup>
                    <Label>Timer description</Label>
                    <DescriptionTextarea isEmpty={!description} value={description} setValue={setDescription} />
                </FormGroup>
                


                <TimeInputContainer>
                    <TimeInputGroup>
                        <Label>Hours</Label>
                        <TimeInput type="text" value={time.hours} onChange={handleTimeOnChange} name="hours" />
                    </TimeInputGroup>
                    <TimeInputGroup>
                        <Label>Minutes</Label>
                        <TimeInput type="text" value={time.minutes} onChange={handleTimeOnChange} name="minutes" />
                    </TimeInputGroup>
                </TimeInputContainer>

                <input
                    type="checkbox"
                    checked={isBillable}
                    value="isBillable"
                    name="isBillable"
                    onChange={() => setIsBillable(value => !value)}
                />
                <input
                    type="checkbox"
                    checked={keepTimer}
                    value="keepTimer"
                    name="keepTimer"
                    onChange={() => setKeepTimer(value => !value)}
                />
            </ModalContent>
            <ButtonContainer>
                <ActionButton onClick={handleCloseModal}>Cancel</ActionButton>
                <ActionButton onClick={handleSubmitModal}>
                    {modalType === 'edit' && 'Edit timer'}
                    {modalType === 'log' && 'Log timer'}
                </ActionButton>
            </ButtonContainer>
        </ModalOuterContainer>
    )
}

export default TimerModalContainer

const HoursAndMinutesToSeconds = ({ hours, minutes }) => {
    const hourSeconds = hours * 3600
    const minuteSeconds = minutes * 60
    return hourSeconds + minuteSeconds
}
function secondsToHMS(seconds) {
    return {
        hours: (seconds / 3600) | 0,
        minutes: ((seconds % 3600) / 60) | 0,
        seconds: seconds % 60 | 0
    }
}

const ModalOuterContainer = Styled(ModalContainer)`
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
        border-bottom: 1px solid #738FDF;
    }
	&::placeholder {
		color: ${props => props.theme.textColor}a1;
    }
    background-color: rgba(0,0,0,0.1);
    padding: 9px 9px;
    border: 1px solid #738FDF;
    width: calc(100% - 10px);
`


const TimeInputContainer = Styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 12px;
`
const TimeInputGroup = Styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-right: 16px;
`
const TimeInput = Styled.input`
    width: 100px;
    background-color: rgba(0,0,0,0.1);
    border: none;
    box-shadow: none;
    color: white;
    line-height: 18px;
    height: 18px;
    border: 1px solid #738FDF;
    height: 35px;
    padding: 4px 12px;
    text-align: center;
`