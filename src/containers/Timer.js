import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useInterval from 'hooks/useInterval'

import TimerCardModalContainer from 'containers/modals/TimerCardModalContainer'

import { editTimer, logToTeamWork } from 'store/actions'

import createTimeEntry from 'api/createTimeEntry'

import {
    startTimer,
    stopTimer,
    commitTimer,

    updateTimerDescription,
    updateTimerSettings,
    removeTimer
} from 'store/actions.js'

const Timer = ({ timer, children }) => {
    const dispatch = useDispatch()

    const [clock, setClock] = useState(timer.elapsedTime)
    const [description, setDescription] = useState(timer.description)

    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)

    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            return setClock(countingSeconds => {
                dispatch(
                    commitTimer({
                        id: timer.id,
                        elapsedTime: countingSeconds
                    })
                )
                return countingSeconds
            })
        });
    }, [])

    useInterval(() => {
        setClock(oldClock => {
            const newClock = oldClock + 1
            //Commit time every 5 minutes
            if (newClock % 300 === 0) {
                dispatch(
                    commitTimer({
                        id: timer.id,
                        elapsedTime: newClock
                    })
                )
            }
            return newClock
        })
    }, [
        timer.running ? 1000 : null,
        () => {
            return setClock(countingSeconds => {
                dispatch(
                    commitTimer({
                        id: timer.id,
                        elapsedTime: countingSeconds
                    })
                )
                return countingSeconds
            })
        }
    ])

    const handleResetTimer = () => {
        setClock(0)
        dispatch(
            commitTimer({
                id: timer.id,
                elapsedTime: 0
            })
        )
        handleStopTimer()
    }
    const handleRemoveTimer = () => {
        dispatch(removeTimer(timer.id))
    }

    const handleStartTimer = () => {
        dispatch(
            startTimer({
                id: timer.id,
                startedTime: Date.now()
            })
        )
    }
    const handleStopTimer = () => {
        dispatch(
            stopTimer({
                id: timer.id
            })
        )
    }

    const handleUpdateDescription = e => {
        if (e.target.value !== timer.description) {
            dispatch(
                updateTimerDescription({
                    id: timer.id,
                    description: e.target.value
                })
            )
        }
    }

    const handleToggleTimerSettings = settingName => {
        dispatch(
            updateTimerSettings({
                id: timer.id,
                settings: {
                    [settingName]: timer.settings[settingName] ? false : true
                }
            })
        )
    }

    const handleEditTimer = () => {
        Promise.resolve(stopTimer({ id: timer.id })).then(() => {
            openTimerModal('edit')
        })
    }
    const handleLogTimer = () => {
        Promise.resolve(stopTimer({ id: timer.id })).then(() => {
            openTimerModal('log')
        })
    }

    const openTimerModal = modalType => {
        handleStopTimer()
        setModalOpen(true)
        setModalType(modalType) //edit, log, add
    }

    const closeTimerModal = () => {
        setModalOpen(false)
        setModalType(null) //edit, log, add
    }
    const submitTimerModal = async ({ timerId, options }) => {
        setClock(options.elapsedTime)
        setDescription(options.description)

        await dispatch(
            editTimer({
                timerId,
                options
            })
        )

        if (modalType === 'log') {
            await dispatch(logToTeamWork({options, timer}))
            await setClock(0)
        }

        setModalOpen(false)
        setModalType(null)
    }

    return (
        <>
            {children(
                timer,
                {
                    clock,
                    description
                },
                {
                    handleResetTimer,
                    handleRemoveTimer,
                    handleStartTimer,
                    handleStopTimer,
                    setDescription,
                    handleUpdateDescription,
                    handleToggleTimerSettings,
                    handleEditTimer,
                    handleLogTimer
                }
            )}

            {modalOpen && (
                <TimerCardModalContainer
                    closeTimerModal={closeTimerModal}
                    submitTimerModal={submitTimerModal}
                    modalOpen={modalOpen}
                    timer={timer}
                    modalType={modalType}
                />
            )}
        </>
    )
}

export default Timer
