import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    height: 100%;
    align-items: flex-start;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 0 8px;
    > *:first-child {
        margin-left: auto;
    }
    > *:last-child {
        margin-right: auto;
    }
`
function ProjectList(props) {
    return (
        <Container ref={props.provided.innerRef} {...props.provided.droppableProps}>
            <div>{/*Placeholder items for centering while allowing drag across whole screen.*/}</div>
            {props.children}
            <div>{/*Placeholder items for centering while allowing drag across whole screen.*/}</div>
        </Container>
    )
}

export default ProjectList
