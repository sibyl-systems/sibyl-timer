import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'


Modal.setAppElement('#root')

const EditTimer = ({timer, currentTimer, modalOpen, closeModal, commitTimer}) => {
    const {hours, minutes} = secondsToHMS(currentTimer)

    const [time, setTime] = useState({
        hours,
        minutes
    })

    const handleOnChange = e => {
        if(e && e.target.name && (Number(e.target.value) || e.target.value === "" || e.target.value == 0)) {
            setTime({
                ...time,
                [e.target.name]: e.target.value,
            })
        }
    }

    const handleCloseModal = () => {
        closeModal()
    }

    const handleEditTimer = () => {
        commitTimer({
            id: timer.id, 
            elapsedTime: HoursAndMinutesToSeconds(time)
        })
        setTime({hours, minutes})
        return handleCloseModal()
    }
    return (
        <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="Edit timer">
        <input type="text" value={time.hours} onChange={handleOnChange} name="hours" />
        <input type="text" value={time.minutes} onChange={handleOnChange} name="minutes" />
            <button onClick={handleEditTimer}>Add Selected Project</button>
            <button onClick={handleCloseModal}>Close Modal</button>
        </Modal>
    )
}


const HoursAndMinutesToSeconds = ({hours, minutes}) => {
    const hourSeconds = hours * 3600
    const minuteSeconds = minutes * 60
    return hourSeconds + minuteSeconds
}
function secondsToHMS(seconds) {
    return {
        hours: (seconds / 3600) | 0,
        minutes: ((seconds % 3600) / 60) | 0,
        seconds: seconds % 60 | 0
    }
}



const mapStateToProps = ({ }) => {
    return { }
}

const mapDispatchToProps = { }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTimer)
