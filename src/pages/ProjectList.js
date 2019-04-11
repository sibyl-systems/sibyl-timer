import React, { useState } from 'react'
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { compose } from 'redux'

import ProjectColumn from '../components/ProjectColumn'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { reorderColumn, addProject, addTimer, startTimer, stopTimer, reorderTimer, commitTimer } from '../store/actions.js'

import AddNewProjectColumn from '../components/AddNewProjectColumn'

import styled from 'styled-components'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    min-width: 300px;
    display: flex;
    flex-direction: row;
`

const InnerProjectList = React.memo(props => {
    const { project, timerMap, index, addTimer, isDropDisabled } = props
    const timers = project.timerIds.map(timerId => timerMap[timerId])
    return (
        <ProjectColumn
            startTimer={props.startTimer}
            stopTimer={props.stopTimer}
            commitTimer={props.commitTimer}
            isDropDisabled={isDropDisabled}
            key={project.id}
            project={project}
            timers={timers}
            index={index}
            addTimer={addTimer}
        />
    )
})

const ProjectList = ({
    projectOrder,
    projects,
    timers,
    reorderTimer,
    reorderColumn,
    addProject,
    addTimer,
    startTimer,
    stopTimer,
    commitTimer
}) => {
    const [dragStartIndex, setDragStartIndex] = useState(null)
    const [dragStartIsAssigned, setDragStartIsAssigned] = useState(null)
    const onDragStart = start => {
        const index = projectOrder.indexOf(start.source.droppableId)
        if(start.type === 'timer') {
            setDragStartIndex(index)
            setDragStartIsAssigned(timers[start.draggableId].task['project-id'] ? true : false)
        }
    }
    const onDragEnd = result => {
        setDragStartIndex(null)
        setDragStartIsAssigned(null)
        if (result.type === 'timer') {
            const { destination, source, draggableId } = result
            if (!destination) return

            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return
            }
            return reorderTimer(result)
        }
        return reorderColumn(result)
    }
    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable droppableId="all-projects" direction="horizontal" type="project">
                {provided => (
                    <Container {...provided.droppableProps} ref={provided.innerRef}>
                        {projectOrder.map((projectId, index) => {
                            const project = projects[projectId]
                            const isDropDisabled = dragStartIsAssigned && index !== dragStartIndex ? true : false
                            return (
                                <InnerProjectList
                                    isDropDisabled={isDropDisabled}
                                    key={project.id}
                                    project={project}
                                    timerMap={timers}
                                    index={index}
                                    addTimer={addTimer}
                                    startTimer={startTimer}
                                    stopTimer={stopTimer}
                                    commitTimer={commitTimer}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <AddNewProjectColumn addProject={addProject} projects={projects} />
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const mapStateToProps = ({ user, projectOrder, projects, timers }) => {
    return { user, projectOrder, projects, timers }
}

const mapDispatchToProps = { reorderColumn, addProject, addTimer, startTimer, stopTimer, reorderTimer, commitTimer }

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ProjectList)
