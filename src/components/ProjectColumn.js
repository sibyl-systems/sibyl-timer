import React from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'

import styled from 'styled-components'

import Timer from './Timer'



const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    min-width: 300px;
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

const InnerTimerList = React.memo((props) => {
    return props.timers.map((timer, index) => (
        <Timer key={timer.id} timer={timer} index={index} />
    ))
})

const ProjectColumn = props => {
    return (
        <Draggable draggableId={props.project.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>{props.project.title}</Title>
                    <Droppable droppableId={props.project.id} type="timer">
                        {(provided, snapshot) => (
                            <TimerList
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerTimerList timers={props.timers} />
                                {provided.placeholder}
                            </TimerList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    )
}

export default ProjectColumn
