import * as React from 'react'
import Styled from 'styled-components'
import { useSelector } from 'react-redux'
import BoardColumn from './BoardColumn'
import { DroppableProvided } from 'react-beautiful-dnd'
import { ReduxState, ProjectOrder, Projects } from '../store/types'

const ColumnContainer = ({ provided }: { provided: DroppableProvided }) => {
    const projectOrder: ProjectOrder = useSelector((state: ReduxState) => state.projectOrder)
    const projects: Projects = useSelector((state: ReduxState) => state.projects)
    return (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
            {projectOrder.map((projectId, index) => {
                const project = projects[projectId]
                return <BoardColumn key={project.id} index={index} project={project} />
            })}
            {provided.placeholder}
        </Container>
    )
}

export default ColumnContainer

const Container = Styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    padding-top: 24px;
    overflow-x: auto;
    overflow-y: hidden;
`
