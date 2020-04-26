import slice from './timerSlice'
const reducer = slice.reducer
const actions = slice.actions

describe('timer slice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should handle start', () => {
        expect(
            reducer(
                { 'timer-1': { running: false } },
                { type: actions.start, payload: { id: 'timer-1' } }
            )
        ).toEqual({ 'timer-1': { running: true } })

        expect(
            reducer(
                {
                    'timer-1': { running: false },
                    'timer-2': { running: true },
                },
                { type: actions.start, payload: { id: 'timer-1' } }
            )
        ).toEqual({
            'timer-1': { running: true },
            'timer-2': { running: false },
        })
    })
    it('should handle stop', () => {
        expect(
            reducer(
                { 'timer-1': { running: true } },
                { type: actions.stop, payload: { id: 'timer-1' } }
            )
        ).toEqual({ 'timer-1': { running: false } })

        expect(
            reducer(
                {
                    'timer-1': { running: false },
                    'timer-2': { running: true },
                },
                { type: actions.stop, payload: { id: 'timer-2' } }
            )
        ).toEqual({
            'timer-1': { running: false },
            'timer-2': { running: false },
        })
    })
})
