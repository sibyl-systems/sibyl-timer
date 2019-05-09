import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    height: 100%;
    align-items: flex-start;
    flex-direction: column;
    min-height: 300px;
    padding-bottom: 80px;
`
function TimerList(props) {
    return (
        <Container {...props.provided.droppableProps} ref={props.provided.innerRef}>
            {props.children}
        </Container>
    )
}

export default TimerList
