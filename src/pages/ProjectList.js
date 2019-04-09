import React from 'react'
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { compose } from 'redux'

import ProjectColumn from '../components/ProjectColumn'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { reorderColumn, addProject } from '../store/actions.js'

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
    const { project, timerMap, index } = props
    const timers = project.timerIds.map(timerId => timerMap[timerId])
    return <ProjectColumn project={project} timers={timers} index={index} />
})

const ProjectList = ({ projectOrder, projects, timers, reorderTimer, reorderColumn, addProject }) => {
    const onDragEnd = result => {
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
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-projects" direction="horizontal" type="project">
                {provided => (
                    <Container {...provided.droppableProps} ref={provided.innerRef}>
                        {projectOrder.map((projectId, index) => {
                            const project = projects[projectId]
                            return (
                                <InnerProjectList key={project.id} project={project} timerMap={timers} index={index} />
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

const mapDispatchToProps = { reorderColumn, addProject }

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ProjectList)
