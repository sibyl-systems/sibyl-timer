import React from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'

import styled from 'styled-components'

import Timer from './Timer'

import AddNewTimerToProject from './AddNewTimerToProject'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    min-width: 300px;
    background: white;
`
const Title = styled.h3`
    padding: 8px;
`
const TimerList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
    transition: 0.2s ease-in-out;
    background: ${props => (props.isDraggingOver ? 'offwhite' : 'white')};
    min-height: 200px;
`

const InnerTimerList = React.memo(props => {
    return props.timers.map((timer, index) => (
        <Timer key={`inner-${timer.id}`} timer={timer} index={index} startTimer={props.startTimer} stopTimer={props.stopTimer} />
    ))
})

const ProjectColumn = props => {
    console.log(props.project.id)
    return (
        <Draggable draggableId={props.project.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>{props.project.name}</Title>
                    <Droppable droppableId={props.project.id} type="timer" isDropDisabled={props.isDropDisabled}>
                        {(provided, snapshot) => (
                            <TimerList
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerTimerList
                                    timers={props.timers}
                                    startTimer={props.startTimer}
                                    stopTimer={props.stopTimer}
                                />
                                {provided.placeholder}
                                <AddNewTimerToProject
                                    addTimer={props.addTimer}
                                    timers={props.timers}
                                    project={props.project}
                                />
                            </TimerList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    )
}

export default ProjectColumn
