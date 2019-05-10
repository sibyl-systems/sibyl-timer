import React, { useRef } from 'react'

import DroppableProjectColumns from 'containers/DroppableProjectColumns'
import DraggableProjectColumn from 'containers/DraggableProjectColumn'
import DraggableTimerRow from 'containers/DraggableTimerRow'
import DroppableTimerRows from 'containers/DroppableTimerRows'
import Timer from 'containers/Timer'

import Styled from 'styled-components'
import { ReactComponent as PlayIcon } from '../assets/play.svg'
import { ReactComponent as PauseIcon } from '../assets/pause.svg'
import ResizableTextarea from 'components/ResizableTextarea'

import { ContextMenuTrigger } from 'react-contextmenu'
import TimerContextMenu from 'components/TimerContextMenu'

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
                                            {(timer, state, methods) => (
                                                <TimeCard
                                                    provided={provided}
                                                    timer={timer}
                                                    state={state}
                                                    methods={methods}
                                                />
                                            )}
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
    margin-bottom: 12px;
    font-weight: 400;
    width: 100%;

    ${props =>
        props.isRunning
            ? `
        background: transparent;
        box-shadow: inset 0 0 0px 2px #333355;
    `
            : `
        background-color: #333355;
    `}
    
`

const TimerContainer = Styled.div`
    padding: 12px 12px 8px;
    display: flex;
`
const TimerActions = Styled.div`
    margin-right: 12px;
`
const TimerClock = Styled.div`
    flex-shrink: 0;
    text-align: center;
    font-size: 14px;
`
const Seconds = Styled.div`
    display: inline;
`
const PlayButton = Styled.button`
    display: flex;
    width: 48px;
    height: 48px;
    border: 1px solid transparent;
    background-color: #45476E;
    border-radius: 50%;
    padding-left: 10px;
    margin: 0 auto 14px;
    &:focus {
        border-color: #F18C64;
    }
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
    width: 48px;
    height: 48px;
    border: 1px solid transparent;
    background-color: #F18C64;
    border-radius: 50%;
    margin: 0 auto 14px;
    &:focus {
        border-color: #F18C64;
    }
    &:hover {
        background-color: #F18C64;
    }
    svg {
        margin: auto;
    }
`

const TimerTitle = Styled.h3`
    font-weight: 300;
    font-size: 15px;
    min-height: 54px;
    display: flex;
    align-items: center;
    margin: 0;
    line-height: 20px;
    padding-bottom: 4px;
    padding-right: 16px;
`
const DescriptionTextarea = Styled(ResizableTextarea)`
    background: none;
    color: #8a88c2;
    width: 100%;
    box-sizing: border-box;
	border: none;
	border-radius: 0;
	resize: none;
	font-size: 14px;
	line-height: 18px;
	overflow: auto;
	height: auto;
	padding: 6px 1px 2px;
    border-bottom: 1px solid transparent;
    font-weight: 400;
    &:focus {
        outline: none;
        border-bottom: 1px solid #738FDF;
    }
	&::placeholder {
		color: #8a88c2a1;
    }
    ${props => props.isUnassigned ? `
        background-color: rgba(0,0,0,0.1);
        padding: 5px 6px 4px;
        margin-top: 11px;
        margin-bottom: 11px;
        width: calc(100% - 10px);
    ` : ``}
`
const TimerMenuButton = Styled.button`
    width: 20px;
    height: 32px;
    border: none;
    background: none;
    box-shadow: none;
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 0;
    margin-top: 9px;
    &:hover {
        background-color: #45476E;
    }
`
const DottedMenu = Styled.div`
    position: relative;
    width: 4px;
    height: 4px;
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
        top: -7px;
    }
    &::after {
        bottom: -7px;
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
    const { provided, timer, state, methods } = props

    const {
        handleStopTimer,
        handleStartTimer,
        setDescription,
        handleUpdateDescription,
        handleResetTimer,
        handleRemoveTimer,
        handleEditTimer,
        handleLogTimer,
        handleToggleTimerSettings
    } = methods
    const { clock, description } = state

    let contextTrigger = useRef(null)

    const toggleContextMenu = e => {
        if (contextTrigger) {
            contextTrigger.handleContextClick(e)
        }
    }
    return (
        <Container {...provided.draggableProps} ref={provided.innerRef} isRunning={timer.running}>
            <ContextMenuTrigger id={timer.id} ref={c => (contextTrigger = c)}>
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
                        {timer.task['project-id'] && <TimerTitle>{timer.task.content}</TimerTitle>}
                        <DescriptionTextarea
                            isEmpty={!description}
                            value={description}
                            setValue={setDescription}
                            onBlur={handleUpdateDescription}
                            isUnassigned={!timer.task['project-id']}
                        />
                    </TimerInformation>
                    <div>
                        <TimerMenuButton onClick={toggleContextMenu}>
                            <DottedMenu />
                        </TimerMenuButton>
                    </div>
                </TimerContainer>
            </ContextMenuTrigger>
            <TimerContextMenu
                timer={timer}
                handleLogTimer={handleLogTimer}
                handleEditTimer={handleEditTimer}
                handleResetTimer={handleResetTimer}
                handleToggleTimerSettings={handleToggleTimerSettings}
                handleRemoveTimer={handleRemoveTimer}
            />

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
