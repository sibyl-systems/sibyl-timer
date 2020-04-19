import * as react from 'react'
import useInterval from './useInterval'

const pad = (n: number) => (String(n) as any).padStart(2, '0').substring(0, 2)

type StopwatchAction = () => void
type StopwatchTime = { time: number; format: string }
type StopwatchCallback = (time?: number) => void
type StopwatchType = (
    initialTime: number,
    callback?: undefined | StopwatchCallback
) => [StopwatchTime, StopwatchAction, StopwatchAction, StopwatchAction]

const formattedTime = (time: number) => {
    let nextTime: number = time
    let hours: number = 0
    let minutes: number = 0
    let seconds: number = 0

    if (nextTime / 3600000 >= 1) {
        hours = Math.floor(nextTime / 3600000)
        nextTime -= hours * 3600000
    }

    if (nextTime / 60000 >= 1) {
        minutes = Math.floor(nextTime / 60000)
        nextTime -= minutes * 60000
    }

    if (nextTime / 1000 >= 1) {
        seconds = Math.floor(nextTime / 1000)
        nextTime -= seconds * 1000
    }
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export const useStopwatch: StopwatchType = (initialTime, callback) => {
    const [running, setRunning] = react.useState<boolean>()
    const [time, setTime] = react.useState({ time: initialTime, format: formattedTime(initialTime) })

    const updateTime = (catchup?: number) => {
        setTime((time: StopwatchTime) => {
            const newTime: number = time.time + (catchup | 1000)
            if(typeof callback === 'function') {
                callback(newTime)
            }
            return {
                time: newTime,
                format: formattedTime(newTime)
            }
        })
    }

    useInterval(updateTime, [running ? 1000 : null])

    const start: StopwatchAction = () => {
        setRunning(true)
    }

    const stop: StopwatchAction = () => {
        setRunning(false)
    }

    const reset: StopwatchAction = () => {
        setRunning(false)
        setTime({
            time: 0,
            format: formattedTime(0)
        })
    }

    return [time, start, stop, reset]
}
