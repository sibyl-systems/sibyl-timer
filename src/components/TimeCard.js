//todo: extract logic from here, and SIMPLIFY!!!

import React, { useState } from 'react'
import ContentEditable from 'react-contenteditable'
// import TimeLogger from './TimeLogger'
import useInterval from '../hooks/useInterval'
import SquareButton from '../components/SquareButton'

function TimeCard({ timer, provided, startTimer, stopTimer, commitTimer }) {
    const [clock, setClock] = useState(timer.elapsedTime)

    useInterval(() => {
        const newClock = clock + 1
        //Commit time every 10 minutes
        if (newClock % 600 === 0) {
            commitTimer({
                id: timer.id,
                elapsedTime: newClock
            })
        }
        setClock(newClock)
    }, [
        timer.running ? 1000 : null,
        () => {
            return setClock(countingSeconds => {
                commitTimer({
                    id: timer.id,
                    elapsedTime: countingSeconds
                })
                return countingSeconds
            })
        }
    ])

    const handleStartTimer = () => {
        startTimer({
            id: timer.id,
            startedTime: Date.now()
        })
    }
    const handleStopTimer = () => {
        stopTimer({
            id: timer.id
        })
    }

    return (
        <div className={`time-card ${timer.running && 'time-card--active'}`} {...provided.dragHandleProps}>
            <h3>{timer.task.content}</h3>
            <div className="time-actions">
                {timer.running ? (
                    <SquareButton
                        icon="pause"
                        className="time-button time-button--stop"
                        title="Stop timer"
                        clickHandler={handleStopTimer}
                    />
                ) : (
                    <SquareButton
                        icon="play"
                        className="time-button"
                        title="Start timer"
                        clickHandler={handleStartTimer}
                    />
                )}
                <div className="time-total">
                    {secondsToHMS(clock).hours}:{secondsToHMS(clock).minutes}:{secondsToHMS(clock).seconds}
                </div>
                <SquareButton
                    icon="cog"
                    disabled={!timer.elapsedTime}
                    className="time-button"
                    title="Share with TeamWork (Log time)"
                    style={{ marginLeft: 'auto' }}
                    // clickHandler={() => logTimer(timerName)}
                />
            </div>
        </div>
    )
}

export default TimeCard

function secondsToHMS(seconds) {
    const pad = n => (n < 10 ? '0' : '') + n
    return {
        hours: pad((seconds / 3600) | 0),
        minutes: pad(((seconds % 3600) / 60) | 0),
        seconds: pad(seconds % 60 | 0)
    }
}
