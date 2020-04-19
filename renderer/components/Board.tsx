import * as React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'

import ColumnContainer from './ColumnContainer'
import store, {
    reorderProjectOrderActionCreator,
    reorderTimerProjectActionCreator,
    relocateTimerProjectActionCreator,
} from '../store'

const draggedItemHasMoved = ({ source, destination }) => {
    if (!destination) return false
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return false
    }
    return true
}

const Board = () => {
    const projects = useSelector(state => state.projects)
    const onDragEnd = result => {
        const { source, destination } = result
        if (!draggedItemHasMoved({ source, destination })) return
        if (result.type === 'PROJECT') {
            return store.dispatch(reorderProjectOrderActionCreator(result))
        }
        const start: string = projects[source.droppableId].id
        const finish: string = projects[destination.droppableId].id
        if (start === finish) {
            return store.dispatch(reorderTimerProjectActionCreator({ result, start }))
        }
        store.dispatch(relocateTimerProjectActionCreator({ result, start, finish }))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='BOARD' direction='horizontal' type='PROJECT'>
                {provided => <ColumnContainer provided={provided} />}
            </Droppable>
        </DragDropContext>
    )
}

export default Board
