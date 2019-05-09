import React from 'react'
import styled from 'styled-components'

import { ContextMenuTrigger } from 'react-contextmenu'

import AddNewTimerToProject from 'components/Modals/AddNewTimerToProject'

const Container = styled.div`
    margin: 8px;
    width: 400px;
    flex-shrink: 0;
    
    background: #2b2b47;
    border-radius: 6px 6px 0 0;
    box-shadow: 0 1px 3px -1px rgba(0,0,0,0.5);
    overflow: hidden;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin: 0;
    height: 50px;
    justify-content: space-between;
    background: #333355;
`

const Title = styled.h3`
    font-size: 18px;
    font-weight: 700;
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    letter-spacing: 0.018em;
`

const CardList = styled.div`
    max-height: calc(100vh - 200px);
    overflow-y: overlay;
    padding: 0 12px 12px;
    margin-top: 12px;
    overflow-x: hidden;
    padding-bottom: 80px;

    &::-webkit-scrollbar {
        width: 4px
    }

    &::-webkit-scrollbar-track {
        background: 
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #393960
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #627FD8
    }

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
            <CardList>
                {props.children}
            </CardList>
        </Container>
    )
}

export default ProjectListColumn
