//todo: extract logic from here, and SIMPLIFY!!!

import React, { useState } from 'react'
import useInterval from '../hooks/useInterval'
import SquareButton from '../components/SquareButton'
import createTimeEntry from '../api/createTimeEntry'

import { connect } from 'react-redux'
import { startTimer, stopTimer, commitTimer, updateTimerDescription, updateTimerSettings, removeTimer } from '../store/actions.js'

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import ReassignTask from './ReassignTask';

const WrappedMenuItem = ({ clickHandler, className, children }) => {
    return (
        <div className={className} onClick={clickHandler}>
            <MenuItem>{children}</MenuItem>
        </div>
    )
}

function TimeCard({
    timer,
    provided,
    startTimer,
    stopTimer,
    commitTimer,
    updateTimerDescription,
    updateTimerSettings,
    removeTimer,
}) {
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

    const handleResetTimer = () => {
        setClock(0)
        commitTimer({
            id: timer.id,
            elapsedTime: 0
        })
        stopTimer({
            id: timer.id
        })
    }

    const handleChangeTask = () => {
        setModalOpen(true)
    }

    const handleUpdateTimerDescription = e => {
        if (e.target.value !== timer.description) {
            updateTimerDescription({
                id: timer.id,
                description: e.target.value
            })
        }
    }
    const handleToggleTimerSettings = settingName => {
        updateTimerSettings({
            id: timer.id,
            settings: {
                [settingName]: timer.settings[settingName] ? false : true
            }
        })
    }

    const handleLogTimer = () => {
        //This is kind of long winded, but it's to ensure then local time is logged
        //into redux to get the right time.
        Promise.resolve(stopTimer({ id: timer.id })).then(() => {
            Promise.resolve(commitTimer({ id: timer.id, elapsedTime: clock })).then(() => {
                createTimeEntry(timer).then(res => {
                    if(!timer.settings.keepTimer) {
                        removeTimer(timer.id)
                    } else {
                        handleResetTimer()
                    }
                })
            })
        })
    }

    const closeModal = () => {
        setModalOpen(false)
    }


    const [modalOpen, setModalOpen] = useState(false)

    return (
        <>
            <ContextMenuTrigger id={timer.id}>
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
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenu id={timer.id}>
                {timer.running ? (
                    <MenuItem onClick={handleStopTimer}>Stop</MenuItem>
                ) : (
                    <MenuItem onClick={handleStartTimer}>Start</MenuItem>
                )}
                <MenuItem onClick={handleLogTimer}>Log Timer</MenuItem>
                <MenuItem onClick={handleChangeTask}>Re-assign task</MenuItem>
                <MenuItem onClick={handleResetTimer}>Reset Timer</MenuItem>
                <MenuItem divider />
                <WrappedMenuItem
                    className={`react-contextmenu-toggle ${timer.settings.isBillable && 'is-selected'}`}
                    clickHandler={() => handleToggleTimerSettings('isBillable')}
                >
                    {timer.settings.isBillable ? <span>[&#10004;]</span> : <span>[&#10006;]</span>}
                    &nbsp;Is billable?
                </WrappedMenuItem>
                <WrappedMenuItem
                    className={`react-contextmenu-toggle ${timer.settings.keepTimer && 'is-selected'}`}
                    clickHandler={() => handleToggleTimerSettings('keepTimer')}
                >
                    {timer.settings.keepTimer ? <span>[&#10004;]</span> : <span>[&#10006;]</span>}
                    &nbsp;Keep timer?
                </WrappedMenuItem>
            </ContextMenu>

            <ReassignTask
                timer={timer}
                modalOpen={modalOpen}
                closeModal={closeModal}
            />
        </>
    )
}

const mapStateToProps = ({  }) => {
    return {  }
}

const mapDispatchToProps = { startTimer, stopTimer, commitTimer, updateTimerDescription, updateTimerSettings, removeTimer }

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
