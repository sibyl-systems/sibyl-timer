import React from 'react'

import { Droppable } from 'react-beautiful-dnd'

import TimerList from 'components/TimerList'

const DroppableTimerRows = props => {
    const { timers } = props
    return (
        <Droppable droppableId={props.project.id} type="timer" isDropDisabled={props.isDropDisabled}>
            {(provided, snapshot) => (
                <TimerList provided={provided} isDraggingOver={snapshot.isDraggingOver}>
                    {props.children(timers)}
                    {provided.placeholder}
                </TimerList>
            )}
        </Droppable>
    )
}

export default DroppableTimerRows
