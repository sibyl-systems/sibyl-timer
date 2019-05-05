import React from 'react'

const Timer = props => {
    const { children, provided, timer } = props
    return children(provided, timer)
}

export default Timer
