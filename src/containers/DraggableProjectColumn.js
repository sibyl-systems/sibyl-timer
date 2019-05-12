import React from 'react'
import { useSelector } from 'react-redux'

import { Draggable } from 'react-beautiful-dnd'
import ProjectListColumn from 'components/ProjectListColumn'

const DraggableProjectColumn = props => {
    const timerMap = useSelector(state => state.timers)
    const { project, index, isDropDisabled } = props
    const timers = project.timerIds.map(timerId => timerMap[timerId])
    return (
        <Draggable draggableId={project.id} index={index}>
            {provided => (
                <ProjectListColumn provided={provided} project={project}>
                    {props.children(timers, project, isDropDisabled)}
                </ProjectListColumn>
            )}
        </Draggable>
    )
}

export default DraggableProjectColumn
