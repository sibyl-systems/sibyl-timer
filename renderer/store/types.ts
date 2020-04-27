export type TimerSettings = {
    isBillable: false
    keepTimer: false
    markAsComplete: false
}
export type Timer = {
    id: string
    description: string
    running: boolean
    startedTime: number | null
    elapsedTime: number
    settings: TimerSettings
    taskId?: number
}
export type Timers = {
    [key: string]: Timer
}
export type Project = {
    id: string
    title: string
    timerIds: string[]
}
export type Projects = {
    [key: string]: Project
}
export type ProjectOrder = string[]

export type DragEndPayload = {
    source: { index: number },
    destination: { index: number },
    draggableId: string,
}

export type Tasks = {}

export type ReduxState = {
    timers: Timers,
    projects: Projects,
    projectOrder: ProjectOrder,
}

export type Task = {
    id: number
    description: string
    canComplete: boolean
    'project-id': number
    'project-name': string
    'todo-list-id': number
    'todo-list-name': string
    'creator-firstname': string
    'creator-lastname': string
    'due-date': string
    'estimated-minutes': number
    'priority': string
    'parentTaskId': string
}