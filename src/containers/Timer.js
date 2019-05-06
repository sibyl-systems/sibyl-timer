import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useInterval from 'hooks/useInterval'

import {
    startTimer,
    stopTimer,
    commitTimer,
    updateTimerDescription,
    updateTimerSettings,
    removeTimer
} from '../store/actions.js'

const Timer = ({ timer, children }) => {
    let toggleContextMenu

    const [clock, setClock] = useState(timer.elapsedTime)
    const [description, setDescription] = useState(timer.description)

    useInterval(() => {
        const newClock = clock + 1
        //Commit time every 5 minutes
        if (newClock % 300 === 0) {
            dispatch(commitTimer({
                id: timer.id,
                elapsedTime: newClock
            }))
        }
        setClock(newClock)
    }, [
        timer.running ? 1000 : null,
        () => {
            return setClock(countingSeconds => {
                dispatch(commitTimer({
                    id: timer.id,
                    elapsedTime: countingSeconds
                }))
                return countingSeconds
            })
        }
    ])

    // const confirmMethods = () => {
        const handleResetTimer = () => {
            setClock(0)
            dispatch(commitTimer({
                id: timer.id,
                elapsedTime: 0
            }))
            handleStopTimer()
        }
        const handleRemoveTimer = () => {
            dispatch(removeTimer(timer.id))
        }
    // }

    const handleStartTimer = () => {
        dispatch(startTimer({
            id: timer.id,
            startedTime: Date.now()
        }))
    }
    const handleStopTimer = () => {
        dispatch(stopTimer({
            id: timer.id
        }))
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


    // const handleEditTimer = () => {
    //     Promise.resolve(stopTimer({ id: timer.id })).then(() => {
    //         openTimerModal('edit')
    //     })
    // }

    // const handleChangeTask = () => {
    //     setModalOpen(true)
    // }

    ////// For later use
    const handleCommitEditTimer = payload => {
        setClock(payload.elapsedTime)
        commitTimer(payload)
    }

    const handleLogTimer = () => {
        //This is kind of long winded, but it's to ensure then local time is logged
        //into redux to get the right time.
        Promise.resolve(stopTimer({ id: timer.id })).then(() => {
            Promise.resolve(commitTimer({ id: timer.id, elapsedTime: clock })).then(() => {
                // createTimeEntry(timer).then(res => {
                //     if (!timer.settings.keepTimer) {
                //         removeTimer(timer.id)
                //     } else {
                //         handleResetTimer()
                //     }
                // })
            })
        })
    }



    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)

    const openTimerModal = (modalType) => {
        setModalOpen(true)
        setModalType(modalType) //edit, log, add
    }
    
    return (
        <>
            {children(timer)}

            {modalOpen && <TimerModalContainer modalType={modalType}>
                {(props) => (
                    <TimerModal modalType={modalType} {...props} />
                )}
            </TimerModalContainer>
            }
        </>
    )
}

export default Timer
