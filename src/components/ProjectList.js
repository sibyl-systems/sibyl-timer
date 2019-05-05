import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    height: 100%;
    align-items: flex-start;
`
function ProjectList(props) {
    return (
        <Container ref={props.provided.innerRef} {...props.provided.droppableProps}>
            {props.children}
        </Container>
    )
}

export default ProjectList
