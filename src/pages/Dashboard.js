import React from 'react'

import DroppableProjectColumns from 'containers/DroppableProjectColumns'
import DraggableProjectColumn from 'containers/DraggableProjectColumn'
import DraggableTimerRow from 'containers/DraggableTimerRow'
import DroppableTimerRows from 'containers/DroppableTimerRows'
import Timer from 'containers/Timer'
import TimeCard from 'components/TimeCard'

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

