import projectSlice from './projectSlice'
import slice from './projectOrderSlice'
const reducer = slice.reducer
const actions = slice.actions
const projectActions = projectSlice.actions

describe('project order slice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([])
    })

    it('should handle actions.reorder', () => {
        expect(
            reducer(['project-1', 'project-2', 'project-3'], {
                type: actions.reorder,
                payload: {
                    source: { index: 0 },
                    destination: { index: 1 },
                    draggableId: 'project-1',
                },
            })
        ).toEqual(['project-2', 'project-1', 'project-3'])
    })
    it('should handle projectActions.add', () => {
        expect(
            reducer([], {
                type: projectActions.add,
                payload: { id: 'project-1' },
            })
        ).toEqual(['project-1'])

        expect(
            reducer(['project-1', 'project-2', 'project-3'], {
                type: projectActions.add,
                payload: { id: 'project-4' },
            })
        ).toEqual(['project-1', 'project-2', 'project-3', 'project-4'])
    })
    it('should handle projectActions.remove', () => {
        expect(
            reducer(['project-1'], {
                type: projectActions.remove,
                payload: { id: 'project-1' },
            })
        ).toEqual([])

        expect(
            reducer(['project-1', 'project-2', 'project-3', 'project-4'], {
                type: projectActions.remove,
                payload: { id: 'project-4' },
            })
        ).toEqual(['project-1', 'project-2', 'project-3'])
    })
})
