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
