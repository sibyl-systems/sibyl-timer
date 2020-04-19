import reducer, { initialState } from './projectSlice'
import {
    ADD_PROJECT,
    REMOVE_PROJECT,
    ADD_TIMER,
    REMOVE_TIMER,
} from '../../actionTypes'

const testProject1 = {
    id: 'some-project',
    title: 'Some Project',
    timerIds: [],
}
const testProject1withTimer = {
    id: 'some-project',
    title: 'Some Project',
    timerIds: ['timer-1'],
}
const testProject2 = {
    id: 'another-project',
    title: 'Another Project',
    timerIds: [],
}

const addProjectToInitialState = reducer(undefined, {
    type: ADD_PROJECT,
    payload: testProject1,
})
const addProjectToExistingState = reducer(
    { [testProject1.id]: testProject1 },
    {
        type: ADD_PROJECT,
        payload: testProject2,
    }
)
const removeProjectFromExistingState = reducer(
    { [testProject1.id]: testProject1 },
    {
        type: REMOVE_PROJECT,
        payload: testProject1,
    }
)
const removeProjectFromExistingState2 = reducer(
    { [testProject1.id]: testProject1, [testProject2.id]: testProject2 },
    {
        type: REMOVE_PROJECT,
        payload: testProject1,
    }
)

const timerPayload = {
    id: 'some-project',
    timer: {
        id: 'timer-1',
    },
}

const addTimer = reducer(
    { [testProject1.id]: testProject1 },
    {
        type: ADD_TIMER,
        payload: timerPayload,
    }
)
const removeTimer = reducer(
    { [testProject1withTimer.id]: testProject1withTimer },
    {
        type: REMOVE_TIMER,
        payload: timerPayload,
    }
)

describe('project reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_PROJECT', () => {
        expect(addProjectToInitialState).toEqual({
            [testProject1.id]: testProject1,
        })

        expect(addProjectToExistingState).toEqual({
            [testProject1.id]: testProject1,
            [testProject2.id]: testProject2,
        })
    })
    it('should handle REMOVE_PROJECT', () => {
        expect(removeProjectFromExistingState).toEqual({})
        expect(removeProjectFromExistingState2).toEqual({
            [testProject2.id]: testProject2
        })
    })
    it('should handle ADD_TIMER', () => {
        expect(addTimer).toEqual({
            [testProject1withTimer.id]: testProject1withTimer,
        })
    })
    it('should handle REMOVE_TIMER', () => {
        expect(removeTimer).toEqual({
            [testProject1.id]: testProject1,
        })
    })
})
