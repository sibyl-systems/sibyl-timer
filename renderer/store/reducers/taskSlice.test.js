import timerSlice from './timerSlice'
import slice from './taskSlice'
const reducer = slice.reducer
const actions = slice.actions

describe('task slice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should handle update task', () => {
        expect(
            reducer(
                { 1: { id: 1 } },
                {
                    type: actions.update,
                    payload: { id: 1, update: { description: 'test' } },
                }
            )
        ).toEqual({ 1: { id: 1, description: 'test' } })
    })
    it('should handle add timer', () => {
        expect(
            reducer(
                {},
                {
                    type: timerSlice.actions.add,
                    payload: { task: { id: 1 } },
                }
            )
        ).toEqual({ 1: { id: 1 } })
    })
    it('should handle remove timer', () => {
        expect(
            reducer(
                { 1: { id: 1 } },
                {
                    type: timerSlice.actions.remove,
                    payload: { taskId: 1 },
                }
            )
        ).toEqual({})
    })
})
