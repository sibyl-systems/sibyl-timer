type TimerSettings = {
    isBillable: false
    keepTimer: false
    markAsComplete: false
}
type Timer = {
    id: string
    description: string
    running: boolean
    startedTime: number | null
    elapsedTime: number
    settings: TimerSettings
}
type Timers = {
    [key: string]: Timer
}
type Project = {
    id: string
    title: string
    timerIds: string[]
}
type Projects = {
    [key: string]: Project
}
type Tasks = {}
export type InitialData = {
    timers: Timers
    projects: Projects
    projectOrder: string[]
    // tasks: Tasks
}

const initialData: InitialData = {
    timers: {
        'timer-1': {
            id: 'timer-1',
            description: 'timer-1',
            running: false,
            startedTime: 0,
            elapsedTime: 3000,
            settings: {
                isBillable: false,
                keepTimer: false,
                markAsComplete: false
            }
        },
        'timer-2': {
            id: 'timer-2',
            description: 'timer-2',
            running: false,
            startedTime: null,
            elapsedTime: 0,
            settings: {
                isBillable: false,
                keepTimer: false,
                markAsComplete: false
            }
        },
        'timer-3': {
            id: 'timer-3',
            description: 'timer-3',
            running: false,
            startedTime: null,
            elapsedTime: 0,
            settings: {
                isBillable: false,
                keepTimer: false,
                markAsComplete: false
            }
        },
        'timer-4': {
            id: 'timer-4',
            description: 'timer-4',
            running: false,
            startedTime: null,
            elapsedTime: 0,
            settings: {
                isBillable: false,
                keepTimer: false,
                markAsComplete: false
            }
        }
    },
    projects: {
        'project-1': {
            id: 'project-1',
            title: 'project-1',
            timerIds: ['timer-4', 'timer-2', 'timer-3']
        },
        'project-2': {
            id: 'project-2',
            title: 'project-2',
            timerIds: ['timer-1']
        }
    },
    projectOrder: ['project-1', 'project-2'],
    // tasks: {}
}

export default initialData
