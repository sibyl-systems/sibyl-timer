import React from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'

import styled from 'styled-components'

import Timer from './Timer'

import AddNewTimerToProject from './AddNewTimerToProject'

const Container = styled.div`
    margin: 8px;
    width: 100%
    min-width: 380px;
    max-width: 464px;
    background: #333355;
    border-radius: 10px
    box-shadow: 0 1px 3px -1px rgba(0,0,0,0.5)
`

const ContainerHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin: 0;
    height: 50px;
    justify-content: space-between;
`
const Title = styled.h3`
    font-size: 18px;
    font-weight: 700;
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
`

const AddButton = styled.button``
const TimerList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    transition: 0.2s ease-in-out;
    background: ${props => (props.isDraggingOver ? 'offwhite' : 'white')};
    min-height: 600px;
    background: #2b2b47;
`

const InnerTimerList = React.memo(props => {
    return props.timers.map((timer, index) => {
        if (timer) {
            return (
                <Timer
                    key={`inner-${timer.id}`}
                    timer={timer}
                    index={index}
                    startTimer={props.startTimer}
                    stopTimer={props.stopTimer}
                    commitTimer={props.commitTimer}
                />
            )
        }
        return <>What?</>
    })
})

const ProjectColumn = props => {
    return (
        <Draggable draggableId={props.project.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                    <ContainerHeader>
                        <Title {...provided.dragHandleProps}>{props.project.name}</Title>
                        <AddNewTimerToProject addTimer={props.addTimer} timers={props.timers} project={props.project} />
                    </ContainerHeader>
                    <Droppable droppableId={props.project.id} type="timer" isDropDisabled={props.isDropDisabled}>
                        {(provided, snapshot) => (
                            <TimerList
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerTimerList
                                    timers={props.timers}
                                    startTimer={props.startTimer}
                                    stopTimer={props.stopTimer}
                                    commitTimer={props.commitTimer}
                                />
                                {provided.placeholder}
                            </TimerList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    )
}

export default ProjectColumn
