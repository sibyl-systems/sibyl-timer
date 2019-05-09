import React from 'react'
import { Draggable } from 'react-beautiful-dnd'


const DraggableTimerRow = React.memo(props => {
    return props.timers.map((timer, index) => {
        if (timer) {
            return (
                <Draggable
                    key={`inner-${timer.id}`}
                    draggableId={timer.id}
                    index={index}
                    type="timer"
                    isDragDisabled={timer.running}
                >
                    {provided => props.children(provided, timer)}
                </Draggable>
            )
        }
        return null
    })
})

export default DraggableTimerRow
