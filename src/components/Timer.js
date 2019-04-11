import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import TimeCard from './TimeCard'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: ${prop => (prop.isDragging ? 'lightgreen' : 'white')};
    padding: 8px;
`

const ProjectColumn = props => {
    return (
        <Draggable draggableId={props.timer.id} index={props.index} type="timer" isDragDisabled={props.timer.running}>
            {(provided, snapshot) => (
                <Container {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
                    <TimeCard
                        timer={props.timer}
                        provided={provided}
                    />
                </Container>
            )}
        </Draggable>
    )
}

export default ProjectColumn
