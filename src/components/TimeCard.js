//todo: extract logic from here, and SIMPLIFY!!!

import React, { useState } from 'react'
import useInterval from '../hooks/useInterval'
import SquareButton from '../components/SquareButton'

import { connect } from 'react-redux'
import { startTimer, stopTimer, commitTimer, updateTimerDescription } from '../store/actions.js'

function TimeCard({ timer, provided, startTimer, stopTimer, commitTimer, updateTimerDescription }) {
    const [clock, setClock] = useState(timer.elapsedTime)
    const [description, setDescription] = useState(timer.description)

    useInterval(() => {
        const newClock = clock + 1
        //Commit time every 5 minutes
        if (newClock % 300 === 0) {
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
    const handleOpenModal = () => {}
    const handleUpdateTimerDescription = (e) => {
        updateTimerDescription({
            id: timer.id,
            description: e.target.value,
        })
    }

    return (
        <div className={`time-card ${timer.running && 'time-card--active'}`} {...provided.dragHandleProps}>
            <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{timer.task.content}</h3>
            <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                onBlur={handleUpdateTimerDescription}
                style={{ marginBottom: '8px' }}
            />
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
                    onClick={handleOpenModal}
                    // clickHandler={() => logTimer(timerName)}
                />
            </div>
        </div>
    )
}

const mapStateToProps = ({ user, projectOrder, projects, timers }) => {
    return { user, projectOrder, projects, timers }
}

const mapDispatchToProps = { startTimer, stopTimer, commitTimer, updateTimerDescription }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeCard)

function secondsToHMS(seconds) {
    const pad = n => (n < 10 ? '0' : '') + n
    return {
        hours: pad((seconds / 3600) | 0),
        minutes: pad(((seconds % 3600) / 60) | 0),
        seconds: pad(seconds % 60 | 0)
    }
}
