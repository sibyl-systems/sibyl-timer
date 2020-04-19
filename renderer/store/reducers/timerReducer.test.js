import reducer, { initialState } from './timerSlice'
import { START_TIMER, STOP_TIMER } from '../../actionTypes'

describe('project reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle START_TIMER', () => {
        expect(
            reducer(
                { 'timer-1': { running: false } },
                { type: START_TIMER, payload: { id: 'timer-1' } }
            )
        ).toEqual({ 'timer-1': { running: true } })

        expect(
            reducer(
                {
                    'timer-1': { running: false },
                    'timer-2': { running: true },
                },
                { type: START_TIMER, payload: { id: 'timer-1' } }
            )
        ).toEqual({
            'timer-1': { running: true },
            'timer-2': { running: false },
        })
    })
    it('should handle STOP_TIMER', () => {
        expect(
            reducer(
                { 'timer-1': { running: true } },
                { type: STOP_TIMER, payload: { id: 'timer-1' } }
            )
        ).toEqual({ 'timer-1': { running: false } })

        expect(
            reducer(
                {
                    'timer-1': { running: false },
                    'timer-2': { running: true },
                },
                { type: STOP_TIMER, payload: { id: 'timer-1' } }
            )
        ).toEqual({
            'timer-1': { running: false },
            'timer-2': { running: false },
        })
    })
})
