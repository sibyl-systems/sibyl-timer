import React from 'react'
import Styled from 'styled-components/macro'

const Container = Styled.div`
    display: flex;
    height: 100%;
    align-items: flex-start;
    flex-direction: column;
    min-height: 300px;
    
`
function TimerList(props) {
    return (
        <Container {...props.provided.droppableProps} ref={props.provided.innerRef}>
            {props.children}
        </Container>
    )
}

export default TimerList
