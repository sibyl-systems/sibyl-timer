import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'

import uuidv4 from 'uuid'

import Styled from 'styled-components'

import getAllProjects from 'api/getAllProjects'
import getTasks from 'api/getTasks'

import Select from 'react-select'

import ResizableTextarea from 'components/ResizableTextarea'
import { object } from 'prop-types';

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
        setLoadingProjects(true)
        const result = await getAllProjects()
        const options = result.projects
        const project = projects[Object.keys(projects).filter((key) => {
            return projects[key].timerIds.includes(timer.id)
        })]
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

    //handleSubmitModal = () => {
    /* 
        submitModal({
            timer
            selectedProject
            selectedTask
            description
            HoursAndMinutesToSeconds(time)
            settings: {
                isBillable,
                keepTimer,
            }
        })
    */
    //}

    return (
        <ModalContainer isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="TEST PROJECT MODAL">
            <div>{loadingProjects ? 'Updating projects...' : 'Projects up to date!'}</div>
            <Select
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                options={projectOptions}
                onChange={handleSelectProject}
                value={selectedProject}
            />
            {selectedProject && (
                <>
                    <div>{loadingTasks ? 'Updating tasks...' : 'Tasks up to date!'}</div>
                    <Select
                        getOptionLabel={option => option.content}
                        getOptionValue={option => option.id}
                        options={taskOptions}
                        onChange={handleSelectTask}
                        value={selectedTask}
                    />
                </>
            )}

            <br />
            <br />
            <DescriptionTextarea isEmpty={!description} value={description} setValue={setDescription} />
            <br />
            <br />

            <input type="text" value={time.hours} onChange={handleTimeOnChange} name="hours" />
            <input type="text" value={time.minutes} onChange={handleTimeOnChange} name="minutes" />

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
                onChange={() => setIsBillable(value => !value)}
            />
        </ModalContainer>
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

const DescriptionTextarea = Styled(ResizableTextarea)`
    background: none;
    color: #8a88c2;
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
    &:focus {
        outline: none;
        border-bottom: 1px solid #738FDF;
    }
	&::placeholder {
		color: #8a88c2a1;
    }
`
