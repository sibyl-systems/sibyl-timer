import slice from './userSlice'
const reducer = slice.reducer
const actions = slice.actions

describe('user slice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })
})
