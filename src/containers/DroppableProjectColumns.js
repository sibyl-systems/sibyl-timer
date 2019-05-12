import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { reorderTimer, reorderColumn } from 'store/actions'

import ProjectList from 'components/ProjectList'

const DroppableProjectColumns = (props) => {
    const projects = useSelector(state => state.projects)
    const projectOrder = useSelector(state => state.projectOrder)
    const timers = useSelector(state => state.timers)
    const dispatch = useDispatch()

    const [dragStartIndex, setDragStartIndex] = useState(null)
    const [dragStartIsAssigned, setDragStartIsAssigned] = useState(null)
    const onDragStart = start => {
        const index = projectOrder.indexOf(start.source.droppableId)
        if (start.type === 'timer') {
            setDragStartIndex(index)
            setDragStartIsAssigned(timers[start.draggableId].task['project-id'] ? true : false)
        }
    }
    const onDragEnd = result => {
        setDragStartIndex(null)
        setDragStartIsAssigned(null)
        const { destination, source } = result
        if (!destination) return

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }
        if (result.type === 'timer') {
            return dispatch(reorderTimer(result))
        }
        return dispatch(reorderColumn(result))
    }
    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable droppableId="all-projects" direction="horizontal" type="project">
                {provided => (
                    <ProjectList provided={provided}>
                        {projectOrder.map((projectId, index) => {
                            const project = projects[projectId]
                            const isDropDisabled = dragStartIsAssigned && index !== dragStartIndex ? true : false
                            return props.children(isDropDisabled, project, index)
                        })}
                        {provided.placeholder}
                    </ProjectList>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DroppableProjectColumns
