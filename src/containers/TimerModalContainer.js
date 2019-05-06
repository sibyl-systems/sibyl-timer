import React, { useState } from 'react'
import getAllProjects from '../../api/getAllProjects'

const TimerModalContainer = ({modalOpen, modalType, selectedProject}) => {

    useEffect(() => {
        if(modalOpen) {
            if(modalType === 'add') {
                handleLoadTasks(selectedProject)
            } else {
                handleLoadProjects()
            }
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

    const [description, setDescription] = useState(current.description | '')
    const [time, setTime] = useState({
        hours: current.hours | 0,
        minutes: current.minutes | 0
    })

    const [isBillable, setIsBillable] = useState(current.isBillable | false)
    const [keepTimer, setKeepTimer] = useState(current.keepTimer | false)


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
        const unassignedTask = {content: 'Unassigned task', id: uuidv4(), unassignedTask: true}
        const options = result['todo-items'].filter(
            current => Object.keys(timers).reduce((acc, curr) => {
                    acc = acc ? timers[curr].task.id !== current.id : false
                    return acc
            }, true)
        )
        setTaskOptions( [ unassignedTask, ...options ] )
        setSelectedTask(unassignedTask)
        setLoadingTasks(false)
    }
    const handleSelectTask = task => {
        setSelectedTask(task)
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

    return props.children(functions)
}


export default TimerModalContainer