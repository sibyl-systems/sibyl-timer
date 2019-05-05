import React from 'react'

import DroppableProjectColumns from 'containers/DroppableProjectColumns'
import DraggableProjectColumn from 'containers/DraggableProjectColumn'
import DraggableTimerRow from 'containers/DraggableTimerRow'
import DroppableTimerRows from 'containers/DroppableTimerRows'
import Timer from 'containers/Timer'

const Dashboard = () => {
    return (
        <DroppableProjectColumns>
            {(isDropDisabled, project, index, timers) => (
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
                                        <Timer provided={provided} timer={timer}>
                                            {(provided, timer) => <TimeCard provided={provided} timer={timer} />}
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

const TimeCard = props => {
    return (
        <div
            style={{ height: '60px', width: '100%' }}
            {...props.provided.draggableProps}
            ref={props.provided.innerRef}
        >
            <div {...props.provided.dragHandleProps}>
                {props.timer.task.content}
                <br></br>
                Hi {props.timer.id} 
            </div>
        </div>
    )
}
