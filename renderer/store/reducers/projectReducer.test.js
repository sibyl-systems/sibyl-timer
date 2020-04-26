import slice from './projectSlice'
const reducer = slice.reducer
const actions = slice.actions
const testProject1 = {
    id: 'some-project',
    title: 'Some Project',
    timerIds: [],
}

const testProject2 = {
    id: 'another-project',
    title: 'Another Project',
    timerIds: [],
}

const addProjectToInitialState = reducer(undefined, {
    type: actions.add,
    payload: testProject1,
})
const addProjectToExistingState = reducer(
    { [testProject1.id]: testProject1 },
    {
        type: actions.add,
        payload: testProject2,
    }
)
const removeProjectFromExistingState = reducer(
    { [testProject1.id]: testProject1 },
    {
        type: actions.remove,
        payload: testProject1,
    }
)
const removeProjectFromExistingState2 = reducer(
    { [testProject1.id]: testProject1, [testProject2.id]: testProject2 },
    {
        type: actions.remove,
        payload: testProject1,
    }
)

describe('project slice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should handle add project', () => {
        expect(addProjectToInitialState).toEqual({
            [testProject1.id]: testProject1,
        })

        expect(addProjectToExistingState).toEqual({
            [testProject1.id]: testProject1,
            [testProject2.id]: testProject2,
        })
    })
    it('should handle remove project', () => {
        expect(removeProjectFromExistingState).toEqual({})
        expect(removeProjectFromExistingState2).toEqual({
            [testProject2.id]: testProject2,
        })
    })
    it('should handle reorder timer', () => {
        expect(
            reducer(
                { 'project-1': { timerIds: ['1', '2', '3'] } },
                {
                    type: actions.reorderTimer,
                    payload: {
                        result: {
                            source: { index: 1 },
                            destination: { index: 0 },
                            draggableId: '2',
                        },
                        start: 'project-1',
                    },
                }
            )
        ).toEqual({
            'project-1': { timerIds: ['2', '1', '3'] },
        })
    })
    it('should handle relocate timer', () => {
        expect(
            reducer(
                {
                    'project-1': { timerIds: ['1', '2', '3'] },
                    'project-2': { timerIds: ['4', '5', '6'] },
                },
                {
                    type: actions.relocateTimer,
                    payload: {
                        result: {
                            source: { index: 0 },
                            destination: { index: 0 },
                            draggableId: '4',
                        },
                        start: 'project-2',
                        finish: 'project-1',
                    },
                }
            )
        ).toEqual({
            'project-1': { timerIds: ['4', '1', '2', '3'] },
            'project-2': { timerIds: ['5', '6'] },
        })
    })
})
