import reducer, { initialState } from './projectOrderSlice'
import { REORDER_PROJECT, ADD_PROJECT, REMOVE_PROJECT } from '../../actionTypes'

describe('project reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_PROJECT', () => {
        expect(
            reducer(undefined, {
                type: ADD_PROJECT,
                payload: { id: 'some-project' },
            })
        ).toEqual(['some-project'])

        expect(
            reducer(['some-project'], {
                type: ADD_PROJECT,
                payload: { id: 'another-project' },
            })
        ).toEqual(['some-project', 'another-project'])
    })
    it('should handle REMOVE_PROJECT', () => {
        expect(
            reducer(['some-project', 'another-project'], {
                type: REMOVE_PROJECT,
                payload: { id: 'some-project' },
            })
        ).toEqual(['another-project'])

        expect(
            reducer(['another-project'], {
                type: REMOVE_PROJECT,
                payload: { id: 'another-project' },
            })
        ).toEqual([])
    })
    it('should handle REORDER_PROJECT', () => {
        expect(
            reducer(['project-1', 'project-2', 'project-3'], {
                type: REORDER_PROJECT,
                payload: {
                    source: { index: 0 },
                    destination: { index: 1 },
                    draggableId: 'project-1',
                },
            })
        ).toEqual(['project-2', 'project-1', 'project-3'])
    })
})

// combine: null
// destination:
// droppableId: "BOARD"
// index: 1
// __proto__: Object
// draggableId: "project-1"
// mode: "FLUID"
// reason: "DROP"
// source:
// droppableId: "BOARD"
// index: 0
// __proto__: Object
// type: "PROJECT"
