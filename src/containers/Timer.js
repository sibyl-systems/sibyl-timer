import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useInterval from 'hooks/useInterval'

import TimerCardModalContainer from 'containers/modals/TimerCardModalContainer'

import { editTimer } from 'store/actions'

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

    useInterval(() => {
        const newClock = clock + 1
        //Commit time every 5 minutes
        if (newClock % 300 === 0) {
            dispatch(
                commitTimer({
                    id: timer.id,
                    elapsedTime: newClock
                })
            )
        }
        setClock(newClock)
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

    ////// For later use
    // const handleCommitEditTimer = payload => {
    //     setClock(payload.elapsedTime)
    //     commitTimer(payload)
    // }

    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)

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
            createTimeEntry({
                elapsedTime: options.elapsedTime,
                settings: options.settings,
                description: options.description,
                task: options.selectedTask,
                id: timer.id //2do: fix this. It's not waiting for redux to update before grabbing the new id...
            }).then(res => {
                if (options.settings.keepTimer) {
                    // handleResetTimer()
                } else {
                    dispatch(removeTimer(timerId))
                }
            })
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
