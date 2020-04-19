import * as React from 'react'
import Styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import ItemContainer from './ItemContainer'
import { Project } from '../store/types'

const BoardColumn = ({ project, index }: { project: Project, index: number }) => {
    return (
        <Draggable draggableId={project.id} index={index}>
            {provided => (
                <Column {...provided.draggableProps} ref={provided.innerRef}>
                    <h2 {...provided.dragHandleProps}>{project.title}</h2>
                    <Droppable droppableId={project.id} type='TIMER'>
                        {provided => (
                            <ItemContainer provided={provided} timerIds={project.timerIds} />
                        )}
                    </Droppable>
                </Column>
            )}
        </Draggable>
    )
}

export default BoardColumn

const Column = Styled.div`
    width: 400px;
    border-radius: 6px 6px 0 0;
    flex-shrink: 0;
    box-shadow: 0 1px 3px -1px rgba(0,0,0,0.5);
    margin: 0 8px;
    background-color: ${p => p.theme.color.background.column};
`
