import React from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'


const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
`

const ProjectColumn = props => {
    return (
        <Draggable draggableId={props.timer.id} index={props.index}>
            {(provided) => (
                <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                    {props.timer.title}
                </Container>
            )}
        </Draggable>
    )
}

export default ProjectColumn
