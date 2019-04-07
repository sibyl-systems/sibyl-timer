import React from 'react'

import { Droppable } from 'react-beautiful-dnd'

import styled from 'styled-components'

import Timer from './Timer'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
`
const Title = styled.h3`
    padding: 8px;
`
const TimerList = styled.div`
    padding: 8px;
`

const ProjectColumn = props => {
    return (
        <Container>
            <Title>{props.project.title}</Title>
            <Droppable droppableId={props.project.id}>
                {provided => (
                    <TimerList {...provided.droppableProps} ref={provided.innerRef}>
                        {props.timers.map((timer, index) => (
                            <Timer key={timer.id} timer={timer} index={index} />
                        ))}
                        {provided.placeholder}
                    </TimerList>
                )}
            </Droppable>
        </Container>
    )
}

export default ProjectColumn
