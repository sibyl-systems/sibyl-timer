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

    it('should handle add', () => {
        expect(
            reducer(
                {},
                {
                    type: actions.add,
                    payload: {
                        id: 'timer-1',
                        timer: {
                            id: 'timer-1',
                            description: 'test',
                            running: false,
                            startedTime: 0,
                            elapsedTime: 0,
                            settings: {
                                isBillable: false,
                                keepTimer: false,
                                markAsComplete: false,
                            },
                        },
                    },
                }
            )
        ).toEqual({
            'timer-1': {
                id: 'timer-1',
                description: 'test',
                running: false,
                startedTime: 0,
                elapsedTime: 0,
                settings: {
                    isBillable: false,
                    keepTimer: false,
                    markAsComplete: false,
                },
            },
        })
    })
    it('should handle remove', () => {
        expect(
            reducer(
                {
                    'timer-1': {
                        id: 'timer-1',
                        description: 'test',
                        running: false,
                        startedTime: 0,
                        elapsedTime: 0,
                        settings: {
                            isBillable: false,
                            keepTimer: false,
                            markAsComplete: false,
                        },
                    },
                },
                { type: actions.remove, payload: { id: 'timer-1' } }
            )
        ).toEqual({})
    })
    it('should handle update', () => {
        expect(
            reducer(
                {
                    'timer-1': {
                        id: 'timer-1',
                        description: 'test',
                        running: false,
                        startedTime: 0,
                        elapsedTime: 0,
                        settings: {
                            isBillable: false,
                            keepTimer: false,
                            markAsComplete: false,
                        },
                    },
                },
                {
                    type: actions.update,
                    payload: { id: 'timer-1', update: { description: 'Updated description' } },
                }
            )
        ).toEqual({
            'timer-1': {
                id: 'timer-1',
                description: 'Updated description',
                running: false,
                startedTime: 0,
                elapsedTime: 0,
                settings: {
                    isBillable: false,
                    keepTimer: false,
                    markAsComplete: false,
                },
            },
        })
    })
    it('should handle save', () => {
        const currentTime = new Date().getTime()
        expect(
            reducer(
                {
                    'timer-1': {
                        id: 'timer-1',
                        elapsedTime: 0,
                    }
                },
                {
                    type: actions.save,
                    payload: { id: 'timer-1', currentTime, elapsedTime: 60},
                }
            )
        ).toEqual({
                'timer-1': {
                    id: 'timer-1',
                    elapsedTime: 60,
                    startedTime: currentTime
                }
            })
    })
})
