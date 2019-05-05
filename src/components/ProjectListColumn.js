import React from 'react'
import styled from 'styled-components'

import { ContextMenuTrigger } from 'react-contextmenu'

import AddNewTimerToProject from 'components/Modals/AddNewTimerToProject'

const Container = styled.div`
    margin: 8px;
    width: 464px;
    background: #333355;
    border-radius: 10px
    box-shadow: 0 1px 3px -1px rgba(0,0,0,0.5)
`

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin: 0;
    height: 50px;
    justify-content: space-between;
`

const Title = styled.h3`
    font-size: 18px;
    font-weight: 700;
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
`


function ProjectListColumn(props) {
    return (
        <Container {...props.provided.draggableProps} ref={props.provided.innerRef}>
            <Header>
                <ContextMenuTrigger id={props.project.id}>
                    <Title {...props.provided.dragHandleProps}>
                        {props.project.name}
                    </Title>
                </ContextMenuTrigger>
                <AddNewTimerToProject project={props.project} />
            </Header>
            {props.children}
        </Container>
    )
}

export default ProjectListColumn
