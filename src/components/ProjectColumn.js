import React from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'

import styled from 'styled-components'

import Timer from './Timer'

import AddNewTimerToProject from './AddNewTimerToProject'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    width: 380px;
    background: white;
    min-height: ;
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
    min-height: 600px;
`

const InnerTimerList = React.memo(props => {
    console.log(props.timers)
    return props.timers.map((timer, index) => {
        console.log(timer)
        if(timer) {
            return (
                <Timer
                    key={`inner-${timer.id}`}
                    timer={timer}
                    index={index}
                    startTimer={props.startTimer}
                    stopTimer={props.stopTimer}
                    commitTimer={props.commitTimer}
                />
            )
        }
        return <>What?</>
    })
})

const ProjectColumn = props => {
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
                                    commitTimer={props.commitTimer}
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
