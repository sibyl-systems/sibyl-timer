import React from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'


const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: ${prop => prop.isDragging ? 'lightgreen' : 'white'};
    padding: 8px;
`

const ProjectColumn = props => {
    console.log(props.timer.task['project-id']);
    return (
        <Draggable draggableId={props.timer.id} index={props.index} type="timer">
            {(provided, snapshot) => (
                <Container {...provided.draggableProps} ref={provided.innerRef} 
                    isDragging={snapshot.isDragging}
                >
                    {props.timer.task.content}
                    {props.timer.description}
                    <div {...provided.dragHandleProps}>Drag me</div>
                </Container>
            )}
        </Draggable>
    )
}

export default ProjectColumn
