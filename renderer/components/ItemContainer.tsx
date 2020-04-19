import * as React from 'react'
import Styled from 'styled-components'
import { Draggable, DroppableProvided } from 'react-beautiful-dnd'
import BoardItem from './BoardItem'

const Container = Styled.div`
    background-color: ${p => p.theme.color.background.card};
    max-height: calc(100vh - 200px);
    min-height: 50vh;
    overflow-y: overlay;
    padding: 0 12px 12px;
    margin-top: 12px;
    overflow-x: hidden;
    padding-bottom: 80px;
`

const ItemContainer = ({
    provided,
    timerIds,
}: {
    provided: DroppableProvided,
    timerIds: string[],
}) => {
    return (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
            {timerIds.map((id, index) => (
                <Draggable draggableId={id} index={index} key={id}>
                    {provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <BoardItem timerId={id} />
                        </div>
                    )}
                </Draggable>
            ))}
            {provided.placeholder}
        </Container>
    )
}

export default ItemContainer
