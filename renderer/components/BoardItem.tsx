import * as React from 'react'
import { useSelector } from 'react-redux'
import { useStopwatch } from '../hooks/useStopwatch'
import store, {
    startTimerActionCreator,
    stopTimerActionCreator,
    saveTimerActionCreator,
} from '../store'

const BoardItem = ({ timerId }: { timerId: string }) => {
    const timer = useSelector(state => state.timers[timerId])
    const handleStartTimer = () => store.dispatch(startTimerActionCreator({ id: timer.id }))
    const handleStopTimer = () => store.dispatch(stopTimerActionCreator({ id: timer.id }))
    const stopwatchCallback = (providedTime: number) => {
        if (providedTime % 3000 === 0) {
            store.dispatch(saveTimerActionCreator({ id: timer.id, elapsedTime: providedTime }))
        }
    }
    const [time, start, stop, reset] = useStopwatch(timer.elapsedTime, stopwatchCallback)
    React.useEffect(() => {
        if (timer.running) {
            start()
        } else {
            store.dispatch(saveTimerActionCreator({ id: timer.id, elapsedTime: time.time }))
            stop()
        }
    }, [timer.running])
    return (
        <div>
            <div>
                {timer.id} - {timer.description}
            </div>
            <div>time: {time.time}</div>
            <div>formatted: {time.format}</div>
            <div onClick={handleStartTimer}>Start</div>
            <div onClick={handleStopTimer}>stop</div>
            <div onClick={reset}>reset</div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default React.memo(BoardItem)
