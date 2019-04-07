import React from 'react'
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { compose } from 'redux'

import ProjectColumn from '../components/ProjectColumn'

import {DragDropContext} from 'react-beautiful-dnd'

const ProjectList = ({projectOrder, projects, timers}) => {
    const onDragEnd = () => {

    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {projectOrder.map(projectId => {
                const project = projects[projectId]
                const currentTimers = project.timerIds.map(timerId => timers[timerId])
                return <ProjectColumn key={project.id} project={project} timers={currentTimers} />
            })}
        </DragDropContext>
    )
}

const mapStateToProps = ({ user, projectOrder, projects, timers }) => {
    return { user, projectOrder, projects, timers }
}

const mapDispatchToProps = {}


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps )
)(ProjectList)
