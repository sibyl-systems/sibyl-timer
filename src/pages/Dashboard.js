import React from 'react'

import DroppableProjectColumns from 'containers/DroppableProjectColumns'
import DraggableProjectColumn from 'containers/DraggableProjectColumn'
import DraggableTimerRow from 'containers/DraggableTimerRow'
import DroppableTimerRows from 'containers/DroppableTimerRows'
import Timer from 'containers/Timer'



import Styled from 'styled-components'
import { ReactComponent as PlayIcon } from '../assets/play.svg'
import { ReactComponent as PauseIcon } from '../assets/pause.svg'




const Dashboard = () => {
    return (
        <DroppableProjectColumns>
            {(isDropDisabled, project, index) => (
                <DraggableProjectColumn 
                    isDropDisabled={isDropDisabled}
                    project={project}
                    index={index}
                    key={project.id}
                >
                    {(timers, project, isDropDisabled) => (
                        <DroppableTimerRows timers={timers} project={project} isDropDisabled={isDropDisabled}>
                            {timers => (
                                <DraggableTimerRow timers={timers}>
                                    {(provided, timer) => (
                                        <Timer timer={timer}>
                                            {(timer) => <TimeCard provided={provided} timer={timer} />}
                                        </Timer>
                                    )}
                                </DraggableTimerRow>
                            )}
                        </DroppableTimerRows>
                    )}
                </DraggableProjectColumn>
            )}
        </DroppableProjectColumns>
    )
}

export default Dashboard













const Container = Styled.div`
    background-color: #333355;
    margin-bottom: 24px;

    font-weight: 400;
    width: 100%;
`

const TimerContainer = Styled.div`
    padding: 12px;
    display: flex;
`
const TimerActions = Styled.div`
    margin-right: 12px;
`
const TimerClock = Styled.div`
    flex-shrink: 0;
    text-align: center;
    font-size: 16px;
`
const Seconds = Styled.div`
    display: inline;
`
const PlayButton = Styled.button`
    display: flex;
    width: 60px;
    height: 60px;
    border: 1px solid transparent;
    background-color: #45476E;
    border-radius: 50%;
    padding-left: 18%;
    margin-bottom: 14px;
    &:hover {
        background-color: #F18C64;
    }
    svg {
        margin: auto;
        fill: white;
    }
`
const PauseButton = Styled.button`
    display: flex;
    width: 60px;
    height: 60px;
    border: 1px solid transparent;
    background-color: #F18C64;
    border-radius: 50%;
    margin-bottom: 14px;
    &:hover {
        background-color: #F18C64;
    }
    svg {
        margin: auto;
    }
`

const TimerTitle = Styled.h3`
    font-weight: 300;
    font-size: 18px;
    min-height: 55px;
    display: flex;
    align-items: center;
`
const DescriptionInput = Styled.input`
    background: none;
    border: none;
    color: #8a88c2;
    margin-bottom: 0;
    height: 24px;
    margin-top: 3px;
    border-bottom: 1px solid transparent;
    width: 100%;
    ${props => (props.isEmpty ? 'border-bottom: 1px solid #738FDF' : '')};
        //This could be better achieved if I just wrapped the input and used pseudo elements
    ${props => (!props.isEmpty ? '    height: 15px; margin-bottom: 0; margin-top: 12px;' : '')}; 
    &:focus {
        outline: none;
        border-bottom: 1px solid #738FDF;
    }
`
const TimerMenuButton = Styled.button`
    width: 52px;
    height: 52px;
    border: none;
    background: none;
    box-shadow: none;
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 0;
    &:hover {
        background-color: #45476E;
    }
`
const DottedMenu = Styled.div`
    position: relative;
    width: 5px;
    height: 5px;
    background-color: #627FD9;
    border-radius: 50%;
    margin: auto;
    &::before,
    &::after {
        left: 0; right: 0;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: 50%;
    }
    &::before {
        top: -8px;
    }
    &::after {
        bottom: -8px;
    }
`
const TimerInformation = Styled.div`
    flex-grow: 1;
`



function secondsToHMS(seconds) {
    const pad = n => (n < 10 ? '0' : '') + n
    return {
        hours: pad((seconds / 3600) | 0),
        minutes: pad(((seconds % 3600) / 60) | 0),
        seconds: pad(seconds % 60 | 0)
    }
}

const TimeCard = props => {
    const {provided, timer} = props
    let handleStopTimer, handleStartTimer, setDescription, handleUpdateTimerDescription, toggleContextMenu
    let clock = 0
    let description = '';
    return (


        <Container {...provided.draggableProps} ref={provided.innerRef}>
            {/* <ContextMenuTrigger id={timer.id} ref={c => (contextTrigger = c)}> */}
                <TimerContainer {...provided.dragHandleProps}>
                    <TimerActions>
                        {timer.running ? (
                            <PauseButton onClick={handleStopTimer}>
                                <PauseIcon />
                            </PauseButton>
                        ) : (
                            <PlayButton onClick={handleStartTimer}>
                                <PlayIcon />
                            </PlayButton>
                        )}
                        <TimerClock>
                            {secondsToHMS(clock).hours}:{secondsToHMS(clock).minutes}:
                            <Seconds>{secondsToHMS(clock).seconds}</Seconds>
                        </TimerClock>
                    </TimerActions>
                    <TimerInformation>
                        <TimerTitle style={{ marginTop: 0, marginBottom: '8px' }}>{timer.task.content}</TimerTitle>
                        <DescriptionInput
                            isEmpty={!description}
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            onBlur={handleUpdateTimerDescription}
                        />
                    </TimerInformation>
                    <div>
                        <TimerMenuButton onClick={toggleContextMenu}>
                            <DottedMenu />
                        </TimerMenuButton>
                    </div>
                </TimerContainer>
            {/* </ContextMenuTrigger> */}
            {/* <TimerContextMenu
                timer={timer}
                handleStopTimer={handleStopTimer}
                handleStartTimer={handleStartTimer}
                handleLogTimer={handleLogTimer}
                handleChangeTask={handleChangeTask}
                handleEditTimer={handleEditTimer}
                handleResetTimer={handleResetTimer}
                handleToggleTimerSettings={handleToggleTimerSettings}
                removeTimer={handleRemoveTimer}
            /> */}

            {/* <ReassignTask timer={timer} modalOpen={modalOpen} closeModal={closeModal} /> */}
            {/* This is to force the state of the modal to reset to props values... todo: make this better. */}
            {/* {editTimerModalOpen && (
                <EditTimer
                    timer={timer}
                    modalOpen={editTimerModalOpen}
                    closeModal={handleCloseTimerModal}
                    commitTimer={handleCommitEditTimer}
                    currentTimer={clock}
                />
            )} */}
        </Container>
    )
}
